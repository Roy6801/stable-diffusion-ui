import TextInput from "./ui/TextInput";
import DropdownInput from "./ui/DropdownInput";
import SliderInput from "./ui/SliderInput";
import SegmentInput from "./ui/SegmentInput";
import { NumberInput } from "@mantine/core";
import { twMerge } from "tailwind-merge";
import Button from "./ui/Button";
import Link from "next/link";

const Parameters = ({ className = "" }: { className?: string }) => {
  const models = ["compvis", "swayml", "dreamscape", "a", "b", "c", "d", "e"];

  return (
    <main
      className={twMerge(
        "w-full flex flex-col flex-1 items-center pt-2 pb-10 px-5 scrollbar overflow-x-hidden",
        className
      )}
    >
      <TextInput
        placeholder="Server URL"
        className="w-full md:w-3/4 lg:w-full mt-4 text-md py-6"
      />

      <div className="w-full md:w-3/4 lg:w-full mt-12 flex items-center justify-around">
        <DropdownInput
          data={models}
          className="w-1/2 mr-1 text-sm"
          placeholder="Model"
        />

        <DropdownInput
          data={models}
          className="w-1/2 ml-1 text-sm"
          placeholder="Scheduler"
        />
      </div>

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

      <div className="flex flex-col w-full md:w-3/4 lg:w-full mt-8">
        <span className="text-md text-amber-400 font-semibold">Seed</span>
        <div className="flex w-full items-center justify-between mt-2">
          <NumberInput
            defaultValue={-1}
            placeholder="Seed Value"
            radius="sm"
            className="w-2/3 mr-1"
            classNames={{
              input:
                "bg-zinc-800 text-amber-200 text-md font-semibold py-6 border-none focus:outline focus:outline-amber-300",
            }}
            hideControls
          />
          <Button className="w-1/3 ml-1">Random</Button>
        </div>
      </div>

      <Link
        href="/more"
        className="underline underline-offset-8 mt-4 hover:text-amber-300 active:text-amber-500"
      >
        More
      </Link>
    </main>
  );
};

export default Parameters;
