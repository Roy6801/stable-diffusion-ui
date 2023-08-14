import subprocess


def start_api():
    subprocess.Popen(
        ["uvicorn", "main:app", "--reload"], cwd="api"
    )  # Start FastAPI server


def start_ui():
    subprocess.Popen(
        ["yarn", "dev"], cwd="ui", shell=True
    )  # Start Next.js development server using yarn


def main():
    start_api()
    start_ui()


if __name__ == "__main__":
    main()
