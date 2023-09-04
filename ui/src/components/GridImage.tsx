import { useState, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { GridImageProps } from "@/types";
import { Loader } from "@mantine/core";

const GridImage = ({ image, onClick }: GridImageProps) => {
  const [encodedImage, setEncodedImage] = useState<string>("");

  const [serverUrl] = useLocalStorage({
    key: "server-url",
    defaultValue: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      if (serverUrl !== "") {
        const url = serverUrl.replace("localhost", "127.0.0.1");

        const { encoded } = await (
          await fetch(
            `${url}/get_image?${new URLSearchParams({
              image_path: image.path,
            })}`,
            {
              cache: "no-store",
              headers: {
                "ngrok-skip-browser-warning": "true",
              },
              signal: signal,
            }
          )
        ).json();

        if (encoded) image.encoded = encoded;

        setEncodedImage(encoded);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [serverUrl]);

  return encodedImage === "" ? (
    <div className="flex items-center justify-center h-[256px] rounded-md bg-zinc-800 m-1 p-2">
      <Loader color="yellow" />
    </div>
  ) : (
    <div
      key={image.file_id}
      onClick={onClick}
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
        src={`data:image/png;base64,${encodedImage}`}
      />
    </div>
  );
};

export default GridImage;
