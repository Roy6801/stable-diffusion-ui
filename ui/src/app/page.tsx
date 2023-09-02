"use client";

import { useState } from "react";
import Parameters from "@/components/Parameters";
import Feed from "@/components/Feed";
import Prompt from "@/components/Prompt";
import { IconMenu, IconX } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

const Home = () => {
  const [generation, setGeneration] = useState<string[]>([]);
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <main className="h-screen w-screen flex flex-col lg:flex-row bg-zinc-900">
      <div
        className={twMerge(
          "flex flex-col w-screen lg:w-1/4 lg:h-screen text-amber-400 lg:shadow-md lg:shadow-black",
          menu && "h-screen"
        )}
      >
        <div className="flex w-full items-center justify-between lg:justify-center px-5 py-10">
          <div className="flex items-center justify-center">
            <span className="text-lg lg:text-xl font-bold font-mono mx-1">
              Stable Diffusion UI
            </span>
            <span className="text-sm font-light font-mono mx-1">(v1.0)</span>
          </div>
          <div
            onClick={(e) => setMenu(!menu)}
            className={`transition-transform duration-300 lg:hidden ${
              menu && "rotate-180"
            }`}
          >
            {menu ? <IconX /> : <IconMenu />}
          </div>
        </div>
        <Parameters className={`${!menu && "hidden lg:flex"}`} />
      </div>

      <div
        className={twMerge(
          "w-screen flex-1 lg:w-3/4 flex flex-col overflow-hidden",
          menu && "hidden"
        )}
      >
        <Feed state={generation} />
        <Prompt setState={setGeneration} />
      </div>
    </main>
  );
};

export default Home;
