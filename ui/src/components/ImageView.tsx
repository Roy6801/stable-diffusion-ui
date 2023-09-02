import { IconX } from "@tabler/icons-react";
import { PromptDetailProps } from "@/types";

const ImageView = ({ image, onClose }: PromptDetailProps) => {
  return (
    <div className="absolute bg-black w-screen h-screen z-20">
      <IconX
        size={28}
        stroke={3}
        color="white"
        onClick={onClose}
        className="absolute top-8 right-8 active:scale-75 duration-300 hover:scale-125"
      />
      <img
        src={`data:image/png;base64,${image?.encoded}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ImageView;
