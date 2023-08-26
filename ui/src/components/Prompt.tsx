import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import { useLocalStorage } from "@mantine/hooks";

const Prompt = ({ className = "" }: { className?: string }) => {
  const [positivePrompt, setPositivePrompt] = useLocalStorage({
    key: "positive-prompt",
    defaultValue: "",
  });

  const [negativePrompt, setNegativePrompt] = useLocalStorage({
    key: "negative-prompt",
    defaultValue: "",
  });

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
      <Button className="w-full lg:w-1/5 m-2">Generate</Button>
    </main>
  );
};

export default Prompt;
