import { useState } from "react";
import { IconX, IconMaximize } from "@tabler/icons-react";
import { PromptDetailProps } from "@/types";
import ImageView from "./ImageView";
import ArrowButton from "./ui/ArrowButton";

const dimensions: { [key: string]: number[] } = {
  "1:1": [512, 512],
  "3:2": [768, 512],
  "2:3": [512, 768],
};

const PromptDetail = ({
  images,
  imageIndex,
  onClose,
  setNext,
  setPrev,
}: PromptDetailProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const image = images[imageIndex];

  return (
    <div className="absolute inset-0 bg-transparent z-10 flex items-center justify-center backdrop-blur-lg overflow-hidden">
      {opened && (
        <ImageView
          images={images}
          imageIndex={imageIndex}
          onClose={() => setOpened(false)}
          setNext={setNext}
          setPrev={setPrev}
        />
      )}

      <ArrowButton
        direction="left"
        className="absolute top-1/2 left-0 w-16 h-10"
        onClick={setPrev}
      />

      <div className="w-screen h-full md:w-11/12 md:h-5/6 flex flex-col md:flex-row rounded-lg scrollbar overflow-hidden">
        <div
          className="relative group w-full md:w-1/2 flex items-center justify-center p-2 bg-zinc-900"
          onClick={(e) => setOpened(true)}
        >
          <div className="absolute inset-0 group-hover:bg-black/10">
            <IconX
              onClick={onClose}
              size={28}
              stroke={3}
              color="white"
              className="absolute top-5 right-5 md:hidden active:scale-75 duration-300 hover:scale-125"
            />
            <IconMaximize
              size={28}
              stroke={3}
              color="white"
              className="absolute bottom-5 right-5 duration-300 group-active:scale-75 group-hover:scale-125"
            />
          </div>
          <img
            src={`data:image/png;base64,${image?.encoded}`}
            className="object-contain w-full rounded-md"
          />
        </div>

        <div className="bg-zinc-800 w-full h-full md:w-1/2 flex flex-col p-5 text-lg text-amber-400 font-mono font-bold scrollbar">
          <IconX
            onClick={onClose}
            size={28}
            stroke={3}
            color="white"
            className="hidden md:flex self-end active:scale-75 duration-300 hover:scale-125"
          />
          <div className="my-2">
            <span className="mr-2">Model:</span>
            <span className="text-xl">
              {image?.model.toUpperCase()} ({image?.revision})
            </span>
          </div>
          <div className="my-2">
            <span className="mr-2">Scheduler:</span>
            <span className="text-xl">{image?.scheduler.toUpperCase()}</span>
          </div>
          <div className="my-2">
            (
            <span className="text-xl">
              {dimensions[image!.aspect_ratio][0]}
            </span>
            <span className="mx-2">X</span>
            <span className="text-xl">
              {dimensions[image!.aspect_ratio][1]}
            </span>
            )
          </div>
          <div className="my-2 flex flex-col">
            <span>Prompt:</span>
            <span className="bg-zinc-900 my-1 p-2 rounded-md">
              {image?.prompt}
            </span>
          </div>
          <div className="my-2 flex flex-col">
            <span>Negative Prompt</span>
            <span className="bg-zinc-900 my-1 p-2 rounded-md">
              {image?.negative_prompt}
            </span>
          </div>
          <div className="my-2 flex flex-col md:flex-row">
            <div className="md: mr-10">
              <span className="md: mr-1">Sampling Steps:</span>
              <span className="text-xl"> {image?.num_inference_steps}</span>
            </div>
            <div>
              <span className="md: mr-1">Guidance Scale:</span>
              <span className="text-xl"> {image?.guidance_scale}</span>
            </div>
          </div>

          <div className="my-2 mr-10">
            <span className="mr-1">Seed:</span>
            <span className="text-xl"> {image?.gen_seed}</span>
          </div>
        </div>
      </div>

      <ArrowButton
        direction="right"
        className="absolute top-1/2 right-0 w-16 h-10"
        onClick={setNext}
      />
    </div>
  );
};

export default PromptDetail;
