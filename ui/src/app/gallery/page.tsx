"use client";

import Link from "next/link";
import { useLocalStorage } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { reverseDate } from "@/utils/functions";
import GalleryScroll from "@/components/GalleryScroll";
import NoGenerations from "@/components/NoGenerations";

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

const Gallery = () => {
  const [serverUrl] = useLocalStorage({
    key: "server-url",
    defaultValue: "",
  });

  const [dates, setDates] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>("");

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

  return (
    <main className="relative h-screen w-screen flex flex-col bg-zinc-900 p-5">
      {dates.length > 0 ? (
        <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden">
          <div className="w-screen md:w-1/6 md:h-full flex flex-row md:flex-col p-2 scrollbar">
            {dates.length > 0 &&
              dates.map((gen_date, index) => (
                <span
                  key={index}
                  onClick={(e) => setCurrent(gen_date)}
                  className={twMerge(
                    "text-sm text-amber-400 hover:font-bold hover:bg-zinc-800 cursor-pointer px-2 py-3 m-1 flex items-center justify-center border-b-2 hover:px-3 md:hover:py-4 border-amber-400 border-opacity-30 whitespace-nowrap",
                    gen_date === current &&
                      "bg-gradient-to-tl from-amber-500 to-amber-200 text-black font-bold"
                  )}
                >
                  {reverseDate(gen_date)}
                </span>
              ))}
          </div>
          <GalleryScroll key={current} serverUrl={serverUrl} date={current} />
        </div>
      ) : (
        <NoGenerations />
      )}
      <div className="h-10 flex items-center justify-center">
        <Link
          href="/"
          className="underline underline-offset-8 my-4 text-amber-400 hover:text-amber-300 active:text-amber-500"
        >
          Back
        </Link>
      </div>
    </main>
  );
};

export default Gallery;
