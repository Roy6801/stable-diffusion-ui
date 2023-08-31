import os


__root_dir = "."

IMAGE_DIR = os.path.join(__root_dir, "images")
TXT_2_IMG_DIR = os.path.join(IMAGE_DIR, "txt2img")
TXT_2_IMG_LOG = os.path.join(IMAGE_DIR, "txt2img.json")


MODEL_DIR = os.path.join(__root_dir, "models")
SRC_DIR = os.path.join(__root_dir, "src")
CONFIG_FILE = os.path.join(SRC_DIR, "config.json")
