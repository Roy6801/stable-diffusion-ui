from fastapi.responses import StreamingResponse
from fastapi import HTTPException
from fastapi_restful import Resource
from threading import Thread
from queue import Queue


class Txt2Img(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def get(
        self,
        prompt: str,
        negative_prompt: str = "nsfw",
        guidance_scale: int = 7,
        num_inference_steps: int = 50,
        aspect_ratio: str = "1:1",
        seed: int = 0,
        batch_size: int = 1,
    ):
        try:
            queue = Queue()
            Thread(
                target=txt2img,
                args=(
                    self.__shared_context,
                    queue,
                    prompt,
                    negative_prompt,
                    guidance_scale,
                    num_inference_steps,
                    aspect_ratio,
                    seed,
                    batch_size,
                ),
            ).start()

            return StreamingResponse(
                image_streamer(queue), media_type="application/json"
            )

        except Exception as e:
            print("HTTP EXCEPTION", e)
            raise HTTPException(500, str(e))


import torch
from torch import autocast
from ..utils.functions import load_txt2img_log, save_txt2img_log
from ..utils import TXT_2_IMG_DIR
from datetime import datetime
from random import randint
from io import BytesIO
import base64
import time
import json
import os


dimensions = {
    "1:1": [512, 512],
    "3:2": [768, 512],
    "2:3": [512, 768],
}


async def image_streamer(queue: Queue):
    while True:
        if queue.empty():
            continue

        img_data = queue.get()
        if img_data is None:
            yield json.dumps({"detail": "success", "status": 200}) + "\n"
            break

        if isinstance(img_data, Exception):
            yield json.dumps({"detail": str(img_data), "status": 500}) + "\n"
            break

        yield json.dumps(img_data) + "\n"


def get_base64(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


def txt2img(
    shared_context: dict,
    queue: Queue,
    prompt: str,
    negative_prompt: str,
    guidance_scale: int = 7,
    num_inference_steps: int = 50,
    aspect_ratio: str = "1:1",
    seed: int = 0,
    batch_size: int = 1,
):
    try:
        pipe = shared_context["pipe"]

        if pipe is None:
            raise Exception("No Model Loaded!")

        device = shared_context["device"]
        tag = shared_context["tag"]
        scheduler = shared_context["scheduler"]
        scheduler_id = shared_context["scheduler_id"]

        if scheduler is None:
            raise Exception("No Scheduler Loaded!")

        pipe.scheduler = scheduler

        prompt = prompt.strip()

        if prompt == "":
            raise Exception("Prompt is Required!")

        negative_prompt = negative_prompt.strip()
        aspect_ratio = aspect_ratio.strip()

        width, height = dimensions[aspect_ratio]

        generator = [
            torch.Generator(device="cuda").manual_seed(gen_seed)
            for gen_seed in range(seed, seed + batch_size)
        ]

        prompt = [prompt for _ in range(batch_size)]
        negative_prompt = [negative_prompt for _ in range(batch_size)]

        def latents_callback(step, timestep, latents):
            with torch.no_grad():
                latents = 1 / 0.18215 * latents
                images = pipe.vae.decode(latents).sample

                images = (images / 2 + 0.5).clamp(0, 1)

                # cast to float32 as this does not cause significant overhead and is compatible with floa16
                images = images.cpu().permute(0, 2, 3, 1).float().numpy()

                # convert to PIL Images
                images = pipe.numpy_to_pil(images)

                latent_images = []

                for image in images:
                    latent_images.append(get_base64(image))

                queue.put(latent_images)

        with autocast(device):
            results = pipe(
                prompt,
                negative_prompt=negative_prompt,
                guidance_scale=guidance_scale,
                num_inference_steps=num_inference_steps,
                width=width,
                height=height,
                generator=generator,
                callback=latents_callback,
                callback_steps=5,
            ).images

            dir_name = datetime.today().strftime(
                "%Y-%m-%d"
            )  # This order allows the directory to be sorted by default
            dir_path = os.path.join(TXT_2_IMG_DIR, dir_name)

            if not os.path.exists(dir_path):
                os.makedirs(dir_path)

            image_log = load_txt2img_log()

            images = []

            for index, image in enumerate(results):
                file_id_seed = randint(0, 999)
                file_id = f"{int(time.time())}_{seed}_{index}_{file_id_seed}"
                file_name = f"{file_id}.png"
                file_path = os.path.join(TXT_2_IMG_DIR, dir_name, file_name)
                image.save(file_path)
                encoded_image = get_base64(image)
                images.append(encoded_image)

                image_log[dir_name] = image_log.get(dir_name, {})
                image_log[dir_name][file_id] = {
                    "path": file_path,
                    "index": index,
                    "gen_seed": seed + index,
                    "file_id_seed": file_id_seed,
                    "prompt": prompt[0],
                    "negative_promot": negative_prompt[0],
                    "guidance_scale": guidance_scale,
                    "num_inference_steps": num_inference_steps,
                    "aspect_ratio": aspect_ratio,
                    "seed": seed,
                    "batch_size": batch_size,
                    "model": tag,
                    "scheduler": scheduler_id,
                    "encoded": encoded_image,
                }

            queue.put(images)
            queue.put(None)

            save_txt2img_log(image_log)
    except Exception as e:
        queue.put(e)
