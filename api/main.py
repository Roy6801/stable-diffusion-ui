from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64
from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())

auth_token = os.getenv("HUGGINGFACE_AUTH_TOKEN")

model_id = None
device = "cuda"
pipe = None

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/load_model")
def load_model(model_id: str, revision: str = "fp16"):
    global pipe
    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        revision=revision,
        torch_dtype=torch.float16,
        use_auth_token=auth_token,
        cache_dir="models",
        safety_checker=None,
    )
    pipe = pipe.to(device)
    return model_id


@app.post("/generate")
def generate(
    prompt: str,
    negative_prompt: str,
    guidance_scale: float,
    num_inference_steps: int = 50,
):
    global pipe
    with autocast(device):
        image = pipe(
            prompt,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps,
        ).images[0]

        image.save("testimage.png")
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        imgstr = base64.b64encode(buffer.getvalue())

        return Response(content=imgstr, media_type="image/png")
