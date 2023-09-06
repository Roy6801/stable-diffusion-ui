from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())

__root_dir = "."
__root_image_dir = os.getenv("CUSTOM_IMAGE_DIR_PATH", __root_dir)
__root_model_dir = os.getenv("CUSTOM_MODEL_DIR_PATH", __root_dir)
__root_config_dir = os.getenv("CUSTOM_CONFIG_DIR_PATH", __root_dir)


IMAGE_DIR = os.path.join(__root_image_dir, "images")
TXT_2_IMG_DIR = os.path.join(IMAGE_DIR, "txt2img")
TXT_2_IMG_LOG = "data.json"

CONFIG = "config.json"

MODEL_DIR = os.path.join(__root_model_dir, "models")
CONFIG_FILE = os.path.join(__root_config_dir, CONFIG)
BASE_CONFIG_FILE = os.path.join(__root_dir, "base_config.json")

print("Image Directory:", IMAGE_DIR)
print("Model Directory:", MODEL_DIR)
print("Config File:", CONFIG_FILE)
