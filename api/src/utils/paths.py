from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())

__root_dir = "."
__root_image_dir = os.getenv("CUSTOM_IMAGE_DIR_PATH", __root_dir)
__root_model_dir = os.getenv("CUSTOM_MODEL_DIR_PATH", __root_dir)


IMAGE_DIR = os.path.join(__root_image_dir, "images")
TXT_2_IMG_DIR = os.path.join(IMAGE_DIR, "txt2img")
TXT_2_IMG_LOG = "data.json"


MODEL_DIR = os.path.join(__root_model_dir, "models")
SRC_DIR = os.path.join(__root_dir, "src")
CONFIG_FILE = os.path.join(SRC_DIR, "config.json")
