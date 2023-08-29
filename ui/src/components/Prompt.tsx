import { twMerge } from "tailwind-merge";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import { useLocalStorage } from "@mantine/hooks";
import { getRandomInt } from "@/utils/functions";

interface PromptProps {
  className?: string;
}

interface Text2ImageProps {
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  num_inference_steps: number;
  aspect_ratio: string;
  seed: number;
  batch_size: number;
}

const Prompt = ({ className = "" }: PromptProps) => {
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

  const [seed] = useLocalStorage({
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

  const handleGenerate = () => {
    const url = serverUrl
      .replace("localhost", "127.0.0.1")
      .replace("http", "ws");

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

    const socket = new WebSocket(`${url}/txt2img`);

    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened", event);
      // Send data to the server after connection is established
      socket.send(JSON.stringify(prompt));
    });

    socket.addEventListener("message", (event) => {
      console.log(JSON.parse(event.data));
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket Closed!", event);
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
  };

  return (
    <main
      className={twMerge(
        "flex flex-col lg:flex-row items-center justify-around p-5",
        className
      )}
    >
      <TextArea
        className="w-full lg:w-2/5 m-2 min-h-[80px] text-md"
        placeholder="Prompt"
        maxHeight="200px"
        state={positivePrompt}
        setState={setPositivePrompt}
      />
      <TextArea
        className="w-full lg:w-2/5 m-2 min-h-[80px] text-md"
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
