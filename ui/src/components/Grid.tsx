import { useState, useEffect } from "react";
import PromptDetail from "./PromptDetail";
import GridImage from "./GridImage";
import { Loader } from "@mantine/core";
import { GridProps } from "@/types";

const Grid = ({ images, infinite, loading }: GridProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          setPrev();
          break;
        case "ArrowRight":
          setNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [index]);

  const setNext = () => {
    if (index < images.length - 1)
      setIndex((prevIndex: number) => prevIndex + 1);
  };

  const setPrev = () => {
    if (index > 0) setIndex((prevIndex: number) => prevIndex - 1);
  };

  return (
    <div className="flex-1 scrollbar overflow-x-hidden">
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 my-2">
        {opened && (
          <PromptDetail
            onClose={() => setOpened(false)}
            images={images}
            imageIndex={index}
            setNext={setNext}
            setPrev={setPrev}
          />
        )}
        {images.map((image, ind) => (
          <GridImage
            onClick={() => {
              setIndex(ind);
              setOpened(true);
            }}
            key={`${image.file_id}`}
            image={image}
          />
        ))}
      </div>
      <div
        className="w-full h-10 flex items-center justify-center"
        ref={infinite}
      >
        {loading && <Loader color="yellow" size="xl" />}
      </div>
    </div>
  );
};

export default Grid;
