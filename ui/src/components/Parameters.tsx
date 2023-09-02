import TextInput from "./ui/TextInput";
import DropdownInput from "./ui/DropdownInput";
import SliderInput from "./ui/SliderInput";
import SegmentInput from "./ui/SegmentInput";
import { NumberInput } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { twMerge } from "tailwind-merge";
import Button from "./ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRandomInt } from "@/utils/functions";
import Loader from "./ui/Loader";

interface ModelInfo {
  revision: string;
  model_name: string;
  author: string;
  identifier: string;
  downloaded: boolean;
}

interface ModelMap {
  [key: string]: ModelInfo;
}

const Parameters = ({ className = "" }: { className?: string }) => {
  const [model, setModel] = useState<string>("");
  const [scheduler, setScheduler] = useState<string>("");

  const [models, setModels] = useState<ModelMap>({});
  const [schedulers, setSchedulers] = useState<object>({});

  const [loader, setLoader] = useState<boolean | string>(false);

  const [serverUrl, setServerUrl] = useLocalStorage({
    key: "server-url",
    defaultValue: "",
  });

  const [samples, setSamples] = useLocalStorage({
    key: "sample-steps",
    defaultValue: 50,
  });

  const [guidance, setGuidance] = useLocalStorage({
    key: "guidance-scale",
    defaultValue: 7,
  });

  const [seed, setSeed] = useLocalStorage({
    key: "prompt-seed",
    defaultValue: getRandomInt(0, 99999999999),
  });

  const [aspectRatio, setAspectRatio] = useLocalStorage({
    key: "aspect-ratio",
    defaultValue: "1:1",
  });

  const [imageCount, setImageCount] = useLocalStorage({
    key: "image-count",
    defaultValue: "1",
  });

  useEffect(() => {
    if (serverUrl !== "") {
      const url = serverUrl.replace("localhost", "127.0.0.1");

      fetch(`${url}/get_models`, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setModels(res);
        })
        .catch((err) => {
          console.log(err);
          setModels({});
        });

      fetch(`${url}/get_schedulers`, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setSchedulers(res);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setSchedulers({});
        });
    }
  }, [serverUrl]);

  useEffect(() => {
    if (serverUrl !== "" && model !== "") {
      console.log(model);
      const url = serverUrl.replace("localhost", "127.0.0.1");

      setLoader(models[model]["downloaded"] ? "Loading" : "Downloading");

      fetch(`${url}/load_model`, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ tag: model }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [model]);

  useEffect(() => {
    if (serverUrl !== "" && scheduler !== "") {
      console.log(scheduler);
      const url = serverUrl.replace("localhost", "127.0.0.1");

      fetch(`${url}/load_scheduler`, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ scheduler_id: scheduler.toLowerCase() }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [scheduler]);

  return (
    <main
      className={twMerge(
        "w-full flex flex-col flex-1 items-center pt-2 pb-10 px-5 scrollbar overflow-x-hidden",
        className
      )}
    >
      {loader && <Loader text={loader} />}
      <TextInput
        placeholder="Server URL"
        className="w-full md:w-3/4 lg:w-full mt-4 text-md py-6"
        state={serverUrl}
        setState={setServerUrl}
      />

      <div className="w-full md:w-3/4 lg:w-full mt-12 flex items-center justify-around">
        <DropdownInput
          data={Object.keys(models)}
          className="w-1/2 mr-1 text-sm"
          placeholder="Model"
          state={model}
          setState={setModel}
        />

        <DropdownInput
          data={Object.keys(schedulers).map((scheduler) =>
            scheduler.toUpperCase()
          )}
          className="w-1/2 ml-1 text-sm"
          placeholder="Scheduler"
          state={scheduler}
          setState={setScheduler}
        />
      </div>

      <div className="w-full md:w-3/4 lg:w-full flex items-center justify-around mt-12">
        <SliderInput
          defaultValue={samples}
          state={samples}
          setState={setSamples}
          min={10}
          max={80}
          step={1}
          label="Sampling Steps"
          placeholder="Enter steps"
          className="w-1/2 mr-1"
        />

        <SliderInput
          defaultValue={guidance}
          state={guidance}
          setState={setGuidance}
          min={0}
          max={30}
          step={1}
          label="Guidance Scale"
          placeholder="Enter scale"
          className="w-1/2 ml-1"
        />
      </div>

      <div className="flex w-full md:w-3/4 lg:w-full items-center justify-between mt-12">
        <span className="text-md text-amber-400 font-semibold font-sans mr-5">
          Aspect Ratio
        </span>
        <SegmentInput
          data={["3:2", "1:1", "2:3"]}
          className="w-full"
          state={aspectRatio}
          setState={setAspectRatio}
        />
      </div>

      <div className="flex w-full md:w-3/4 lg:w-full items-center justify-between mt-12">
        <span className="text-md text-amber-400 font-semibold font-sans mr-5">
          Count
        </span>
        <SegmentInput
          data={["1", "2", "3", "4"]}
          className="w-full"
          state={imageCount}
          setState={setImageCount}
        />
      </div>

      <div className="flex flex-col w-full md:w-3/4 lg:w-full mt-8">
        <span className="text-md text-amber-400 font-semibold">Seed</span>
        <div className="flex w-full items-center justify-between mt-2">
          <NumberInput
            defaultValue={seed}
            value={seed}
            onChange={(value) => {
              if (value !== "") setSeed(value);
              else setSeed(getRandomInt(0, 99999999999));
            }}
            placeholder="Seed Value"
            radius="sm"
            className="w-2/3 mr-1"
            classNames={{
              input:
                "bg-zinc-800 text-amber-200 text-md font-semibold py-6 border-none focus:outline focus:outline-amber-300",
            }}
            hideControls
          />
          <Button
            onClick={(e) => setSeed(getRandomInt(0, 99999999999))}
            className="w-1/3 ml-1"
          >
            Random
          </Button>
        </div>
      </div>

      <div className="flex w-full md:w-3/4 lg:w-full mt-8 items-center justify-around">
        <Link
          href="/gallery"
          className="underline underline-offset-8 text-amber-400 hover:text-amber-300 active:text-amber-500"
        >
          Image Gallery
        </Link>
        <Link
          href="/settings"
          className="underline underline-offset-8 text-amber-400 hover:text-amber-300 active:text-amber-500"
        >
          Settings
        </Link>
      </div>
    </main>
  );
};

export default Parameters;
