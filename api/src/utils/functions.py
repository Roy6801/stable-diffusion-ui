from .paths import TXT_2_IMG_LOG, CONFIG_FILE, BASE_CONFIG_FILE
from io import BytesIO
import base64
import json
import os


def verify_config() -> dict:
    fr = open(BASE_CONFIG_FILE, "r")
    base_config = json.load(fr)
    fr.close()

    if os.path.exists(CONFIG_FILE):
        config_data = load_config()
        if (
            isinstance(config_data["models"], dict)
            and config_data["scheduler"] == base_config["scheduler"]
        ):
            return config_data

    save_config(base_config)
    return base_config


def load_config() -> dict:
    fr = open(CONFIG_FILE, "r")
    config_data: dict = json.load(fr)
    fr.close()

    return config_data


def save_config(config_data: dict) -> None:
    fw = open(CONFIG_FILE, "w")
    json.dump(config_data, fw, indent=2)
    fw.close()


def load_txt2img_log(dir_path: str) -> dict:
    log_file = os.path.join(dir_path, TXT_2_IMG_LOG)

    if os.path.exists(log_file):
        fr = open(log_file, "r")
        log_data: dict = json.load(fr)
        fr.close()
    else:
        log_data = {}
        save_txt2img_log(dir_path=dir_path, log_data=log_data)

    return log_data


def save_txt2img_log(dir_path: str, log_data: dict) -> None:
    log_file = os.path.join(dir_path, TXT_2_IMG_LOG)

    fw = open(log_file, "w")
    json.dump(log_data, fw, indent=2)
    fw.close()


def get_base64(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")
