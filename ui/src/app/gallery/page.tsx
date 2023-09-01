"use client";

import Link from "next/link";
import { useLocalStorage } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { reverseDate } from "@/utils/functions";

const Gallery = () => {
  const [serverUrl] = useLocalStorage({
    key: "server-url",
    defaultValue: "",
  });

  const [current, setCurrent] = useState<string>("");
  const [dates, setDates] = useState<string[]>([]);
  const [images, setImages] = useState<object>({});

  const fetchDates = async (url: string) => {
    const data: string[] = await (
      await fetch(url, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
    ).json();
    return data;
  };

  const fetchImages = async (url: string) => {
    const data: object = await (
      await fetch(url, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
    ).json();
    return data;
  };

  useEffect(() => {
    (async () => {
      if (serverUrl !== "") {
        const url = serverUrl.replace("localhost", "127.0.0.1");

        const all_dates = await fetchDates(
          `${url}/get_dates?${new URLSearchParams({
            image_dir: "txt2img",
            desc: "true",
          })}`
        );

        setDates(all_dates);
        setCurrent(all_dates[0]);
      }
    })();
  }, [serverUrl]);

  useEffect(() => {
    (async () => {
      if (serverUrl !== "" && current !== "") {
        const url = serverUrl.replace("localhost", "127.0.0.1");
        const all_images = await fetchImages(
          `${url}/get_images?${new URLSearchParams({
            image_dir: "txt2img",
            date: current,
            desc: "true",
          })}`
        );

        setImages(all_images);
      }
    })();
  }, [current]);

  return (
    <main className="h-screen w-screen flex flex-col bg-zinc-900 p-5">
      <div className="w-full flex flex-1">
        <div className="w-1/6 h-full flex flex-col p-2">
          {dates.length > 0 &&
            dates.map((gen_date, index) => (
              <span
                key={index}
                onClick={(e) => setCurrent(gen_date)}
                className={twMerge(
                  "text-sm text-amber-400 hover:font-bold hover:bg-zinc-800 cursor-pointer py-3 m-1 flex items-center justify-center border-b-2 hover:py-4 border-amber-400 border-opacity-30",
                  gen_date === current &&
                    "bg-gradient-to-tl from-amber-500 to-amber-200 text-black font-bold"
                )}
              >
                {reverseDate(gen_date)}
              </span>
            ))}
        </div>
      </div>
      <div className="h-10 flex items-center justify-center">
        <Link
          href="/"
          className="underline underline-offset-8 mt-4 text-amber-400 hover:text-amber-300 active:text-amber-500"
        >
          Back
        </Link>
      </div>
    </main>
  );
};

export default Gallery;
