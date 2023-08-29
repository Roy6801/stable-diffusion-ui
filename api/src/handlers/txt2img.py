from fastapi import WebSocket
import json
import asyncio
from threading import Thread


class Txt2ImgParams:
    prompt: str
    negative_prompt: str
    guidance_scale: int
    num_inference_steps: int
    aspect_ratio: str
    seed: int
    batch_size: int

    def __init__(self, data):
        for key in data:
            setattr(self, key, data[key])


async def txt2img(shared_context, websocket: WebSocket):
    try:
        data: Txt2ImgParams = Txt2ImgParams(json.loads(await websocket.receive_text()))

        queue = asyncio.Queue()

        async def send_images():
            while True:
                image = await queue.get()
                if image is None:
                    break
                await websocket.send_text(image)

        send_task = asyncio.create_task(send_images())

        Thread(
            target=txt2img_generator,
            args=(
                shared_context,
                queue,
                data.prompt,
                data.negative_prompt,
                data.guidance_scale,
                data.num_inference_steps,
                data.aspect_ratio,
                data.seed,
                data.batch_size,
            ),
        ).start()

        await send_task

    except:
        raise Exception("txt2img err")


import torch
from torch import autocast
from src.utils import TXT_2_IMG_DIR
from io import BytesIO
import base64
from datetime import datetime
import time
import os


dimensions = {
    "1:1": [512, 512],
    "3:2": [768, 512],
    "2:3": [512, 768],
}


def get_base64(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")


def txt2img_generator(
    shared_context,
    queue,
    prompt: str,
    negative_prompt: str,
    guidance_scale: int = 7,
    num_inference_steps: int = 50,
    aspect_ratio: str = "1:1",
    seed: int = 0,
    batch_size: int = 1,
):
    device = shared_context["device"]
    pipe = shared_context["pipe"]

    prompt = prompt.strip()
    negative_prompt = negative_prompt.strip()
    aspect_ratio = aspect_ratio.strip()

    width, height = dimensions[aspect_ratio]

    generator = [
        torch.Generator(device="cuda").manual_seed(seed) for _ in range(batch_size)
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

            img_data = json.dumps(latent_images)
            queue.put_nowait(img_data)

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

        dir_name = datetime.today().strftime("%d-%m-%Y")
        dir_path = os.path.join(TXT_2_IMG_DIR, dir_name)

        if not os.path.exists(dir_path):
            os.makedirs(dir_path)

        images = []

        for ind, image in enumerate(results):
            file_name = f"{int(time.time())}_{seed}_{ind}.png"
            file_path = os.path.join(TXT_2_IMG_DIR, dir_name, file_name)
            image.save(file_path)
            images.append(get_base64(image))

        img_data = json.dumps(images)
        queue.put_nowait(img_data)
