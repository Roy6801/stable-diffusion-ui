import { IconX } from "@tabler/icons-react";
import { PromptDetailProps } from "@/types";
import ArrowButton from "./ui/ArrowButton";

const ImageView = ({
  images,
  imageIndex,
  onClose,
  setNext,
  setPrev,
}: PromptDetailProps) => {
  const image = images[imageIndex];
  return (
    <div className="absolute bg-black w-screen h-screen z-20">
      <IconX
        size={28}
        stroke={3}
        color="white"
        onClick={onClose}
        className="absolute top-8 right-8 active:scale-75 duration-300 hover:scale-125"
      />

      <ArrowButton
        direction="left"
        className="absolute top-1/2 left-0 w-16 h-10 z-30"
        onClick={setPrev}
      />

      <img
        src={`data:image/png;base64,${image?.encoded}`}
        className="w-full h-full object-contain"
      />

      <ArrowButton
        direction="right"
        className="absolute top-1/2 right-0 w-16 h-10 z-30"
        onClick={setNext}
      />
    </div>
  );
};

export default ImageView;
