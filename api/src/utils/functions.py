from .paths import TXT_2_IMG_LOG
import json
import os


def load_txt2img_log():
    if os.path.exists(TXT_2_IMG_LOG):
        fr = open(TXT_2_IMG_LOG, "r")
        image_log: dict = json.load(fr)
        fr.close()
    else:
        image_log = {}

    return image_log


def save_txt2img_log(log_file: dict):
    fw = open(TXT_2_IMG_LOG, "w")
    json.dump(log_file, fw, indent=2)
    fw.close()
