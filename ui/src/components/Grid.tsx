import { IconSearch } from "@tabler/icons-react";
import { ImageMapProps } from "@/types";

const Grid = ({ images }: { images: ImageMapProps }) => {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 scrollbar overflow-x-hidden p-2 my-2">
      {Object.keys(images).map((imageKey, index) => (
        <div
          key={index}
          className="relative group bg-zinc-800 p-2 hover:p-0 m-1 flex items-center justify-center rounded-md h-[256px] hover:scale-105 duration-300"
        >
          <div className="absolute inset-0 group-hover:bg-black/30 flex items-center justify-center">
            <IconSearch
              size={36}
              stroke={3}
              color="orange"
              className="hidden group-hover:flex"
            />
          </div>
          <img
            className="object-cover w-full h-full rounded-md"
            src={`data:image/png;base64,${images[imageKey]["encoded"]}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;