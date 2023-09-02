from .paths import TXT_2_IMG_LOG
from io import BytesIO
import base64
import json
import os


def load_txt2img_log(dir_path: str):
    log_file = os.path.join(dir_path, TXT_2_IMG_LOG)

    if os.path.exists(log_file):
        fr = open(log_file, "r")
        log_data: dict = json.load(fr)
        fr.close()
    else:
        log_data = {}
        save_txt2img_log(dir_path=dir_path, log_data=log_data)

    return log_data


def save_txt2img_log(dir_path: str, log_data: dict):
    log_file = os.path.join(dir_path, TXT_2_IMG_LOG)

    fw = open(log_file, "w")
    json.dump(log_data, fw, indent=2)
    fw.close()


def get_base64(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode("utf-8")
