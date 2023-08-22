import TextInput from "./ui/TextInput";
import DropdownInput from "./ui/DropdownInput";
import SliderInput from "./ui/SliderInput";
import SegmentInput from "./ui/SegmentInput";
import Button from "./ui/Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const Parameters = ({ className = "" }: { className?: string }) => {
  const models = ["compvis", "swayml", "dreamscape", "a", "b", "c", "d", "e"];

  return (
    <main
      className={twMerge(
        "w-full flex flex-col flex-1 items-center px-5 pt-2 pb-10 scrollbar overflow-x-hidden",
        className
      )}
    >
      <div className="w-full md:w-3/4 lg:w-full flex items-center justify-around mt-4">
        <TextInput
          placeholder="Server URL"
          className="mr-2 h-16 w-2/3 md:w-3/4"
        />
        <Link
          href="/history"
          className="text-sm underline underline-offset-8 ml-2 text-amber-400 hover:text-amber-200 active:text-amber-500"
        >
          All Images
        </Link>
      </div>

      <DropdownInput
        data={models}
        className="w-full md:w-3/4 lg:w-full mt-12"
        placeholder="Select Model"
      />

      <div className="w-full md:w-3/4 lg:w-full flex items-center justify-around mt-12">
        <SliderInput
          defaultValue={50}
          min={10}
          max={80}
          step={1}
          label="Sampling Steps"
          placeholder="Enter steps"
          className="w-1/2 mr-1"
        />

        <SliderInput
          defaultValue={7}
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
        <SegmentInput data={["3:2", "1:1", "2:3"]} className="w-full" />
      </div>

      <div className="flex w-full md:w-3/4 lg:w-full items-center justify-between mt-12">
        <span className="text-md text-amber-400 font-semibold font-sans mr-5">
          Count
        </span>
        <SegmentInput data={["1", "2", "3", "4"]} className="w-full" />
      </div>

      <div className="flex w-full md:w-3/4 lg:w-full items-center justify-between mt-12">
        <TextInput
          placeholder="Paste Model ID/Link"
          className="w-2/3 md:w-3/4 h-16"
        />
        <Button className="flex-1 ml-3">Add</Button>
      </div>
    </main>
  );
};

export default Parameters;
