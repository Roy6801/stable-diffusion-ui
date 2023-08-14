import subprocess


def install_api_dependencies():
    process = subprocess.Popen(
        ["pip", "install", "-r", "requirements.txt"]
    )  # Install dependencies
    process.wait()
    process.terminate()


def install_ui_dependencies():
    process = subprocess.Popen(
        ["yarn"], cwd="ui", shell=True
    )  # Install dependencies using yarn
    process.wait()
    process.terminate()


def main():
    install_api_dependencies()
    install_ui_dependencies()


if __name__ == "__main__":
    main()
