import { twMerge } from "tailwind-merge";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import { useLocalStorage } from "@mantine/hooks";
import { getRandomInt } from "@/utils/functions";
import { useState } from "react";
import Loader from "./ui/Loader";
import { PromptProps, Text2ImageProps } from "@/types";

const Prompt = ({ className = "", setState = () => {} }: PromptProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [positivePrompt, setPositivePrompt] = useLocalStorage({
    key: "positive-prompt",
    defaultValue: "",
  });

  const [negativePrompt, setNegativePrompt] = useLocalStorage({
    key: "negative-prompt",
    defaultValue: "",
  });

  const [serverUrl] = useLocalStorage({
    key: "server-url",
    defaultValue: "",
  });

  const [samples] = useLocalStorage({
    key: "sample-steps",
    defaultValue: 50,
  });

  const [guidance] = useLocalStorage({
    key: "guidance-scale",
    defaultValue: 7,
  });

  const [seed, setSeed] = useLocalStorage({
    key: "prompt-seed",
    defaultValue: getRandomInt(0, 99999999999),
  });

  const [aspectRatio] = useLocalStorage({
    key: "aspect-ratio",
    defaultValue: "1:1",
  });

  const [imageCount] = useLocalStorage({
    key: "image-count",
    defaultValue: "1",
  });

  const handleGenerate = async () => {
    if (serverUrl !== "") {
      const url = serverUrl.replace("localhost", "127.0.0.1");

      setLoading(true);

      const prompt: Text2ImageProps = {
        prompt: positivePrompt,
        negative_prompt: negativePrompt,
        guidance_scale: guidance,
        num_inference_steps: samples,
        aspect_ratio: aspectRatio,
        seed: seed,
        batch_size: Number.parseInt(imageCount),
      };

      console.log(prompt);

      try {
        const params = new URLSearchParams();
        Object.entries(prompt).forEach(([key, value]) => {
          params.append(key, String(value));
        });

        const response = await fetch(`${url}/txt2img?${params}`, {
          cache: "no-store",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (response.body) {
          const reader = response.body.getReader();

          let data = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              setLoading(false);
              break;
            }
            data += new TextDecoder().decode(value);

            if (data.includes("\n")) {
              const [jsonObject, remainingData] = data.split("\n", 1);
              const images = JSON.parse(jsonObject);

              if (typeof images === "object" && !Array.isArray(images)) {
                const { detail, status } = images;
                console.log(status, detail);
              }
              if (remainingData) data = remainingData;
              else data = "";
              setState(images);
            }
          }
        }
        setSeed(getRandomInt(0, 99999999999));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
  };

  return (
    <main
      className={twMerge(
        "flex flex-col md:flex-row items-center justify-around p-5",
        className
      )}
    >
      {loading && <Loader text="Generating" />}
      <TextArea
        className="w-full lg:w-2/5 m-2 lg:min-h-[80px] text-md"
        placeholder="Prompt"
        maxHeight="200px"
        state={positivePrompt}
        setState={setPositivePrompt}
      />
      <TextArea
        className="w-full lg:w-2/5 m-2 lg:min-h-[80px] text-md"
        placeholder="Negative Prompt"
        maxHeight="200px"
        state={negativePrompt}
        setState={setNegativePrompt}
      />
      <Button className="w-full lg:w-1/5 m-2" onClick={handleGenerate}>
        Generate
      </Button>
    </main>
  );
};

export default Prompt;
