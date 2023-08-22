import { twMerge } from "tailwind-merge";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";

const Prompt = ({ className = "" }: { className?: string }) => {
  return (
    <main
      className={twMerge(
        "flex flex-col lg:flex-row items-center justify-around p-5",
        className
      )}
    >
      <TextArea
        className="w-full lg:w-2/5 m-2 min-h-[80px]"
        placeholder="Prompt"
        maxHeight="200px"
      />
      <TextArea
        className="w-full lg:w-2/5 m-2 min-h-[80px]"
        placeholder="Negative Prompt"
        maxHeight="200px"
      />
      <Button className="w-full lg:w-1/5 m-2">Generate</Button>
    </main>
  );
};

export default Prompt;
