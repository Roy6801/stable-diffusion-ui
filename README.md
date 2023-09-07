# Stable-Diffusion-UI

- ### Website - https://diffuser-ui.vercel.app
- ### Google Colab Server - [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Roy6801/stable-diffusion-ui/)

<br />

## Insights/ Features

- **Simple UI for Prompt-based Image Generation.**
- **Supports Negative Prompting.**
- **Add any Model Tag and Revision (Branch Name) from HuggingFace to generate Images.**

- **Switch between different Schedulers for Generation.**

- **Select Number of Images and Aspect Ratio as per your choice.**

<br />

## How to Use?

### Know the Environment Variables

| Variable Name          | Use                                                                     | Required/Optional                  |
| ---------------------- | ----------------------------------------------------------------------- | ---------------------------------- |
| HUGGINGFACE_AUTH_TOKEN | Using/Downloading HuggingFace Models                                    | **Required**                       |
| NGROK_AUTH_TOKEN       | To run your own server online                                           | Optional (If using Online Version) |
| CUSTOM_IMAGE_DIR_PATH  | Set a Directory where the Images will be stored                         | Optional (Default = /api)          |
| CUSTOM_MODEL_DIR_PATH  | Set a Directory where the Models will be downloaded and loaded from     | Optional (Default = /api)          |
| CUSTOM_CONFIG_DIR_PATH | Set a Directory for loading Config File that stores all functional data | Optional (Default = /api)          |

<br />

## Follow Either One

### 1. Run Locally on Your PC

- **Pre-Requisites**

  - **Powerful GPU**
  - **Node and Python (3.7+) Installed**
  - **Run Command: `npm install -g yarn`**

<br />

- **Clone this Repository.**
- **Create and use a Python Virtual Environment: `python -m venv venv`**
- **Run installer.py**
- **Run launcher.py**

<br />

### 2. Use it Online

- **Run your own Stable Diffusion Server!**

  - **Click on this button to [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Roy6801/stable-diffusion-ui/)**
  - **Click on Copy to Drive when the Notebook opens.**

  - **Follow the Instructions Inside.**

- **Visit Diffuser-UI Website! (https://diffuser-ui.vercel.app)**

  - **Set the Server URL to the URL that will be generated in the Colab.**

<br />

### ✨🎉 Happy Prompting! 🎉🥳
