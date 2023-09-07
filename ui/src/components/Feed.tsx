import { twMerge } from "tailwind-merge";
import { FeedProps } from "@/types";

const Feed = ({ className = "", state = [] }: FeedProps) => {
  return (
    <main
      className={twMerge(
        "flex-1 flex items-center justify-center overflow-hidden p-1",
        className
      )}
    >
      {state.length > 0 ? (
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 scrollbar">
          {state.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${image}`}
              className="m-1 w-full"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-4xl md:text-6xl font-black text-zinc-800">
            Stable Diffusion
          </span>
          <div className="flex flex-col md:flex-row mt-5 items-center justify-center">
            <span className="text-md md:text-lg m-2 font-semibold text-zinc-600">
              Get your Server URL Here
            </span>
            <a
              href="https://colab.research.google.com/github/Roy6801/stable-diffusion-ui/"
              target="_blank"
            >
              <img src="https://colab.research.google.com/assets/colab-badge.svg" />
            </a>
          </div>
          <div className="flex items-center justify-center mt-5 text-sm text-zinc-500">
            <a
              href="https://github.com/Roy6801/stable-diffusion-ui#how-to-use"
              target="_blank"
            >
              <span className="text-amber-400 hover:text-amber-300 active:text-amber-500 ml-2 underline underline-offset-4">
                How to Use?
              </span>
            </a>
          </div>
        </div>
      )}
    </main>
  );
};

export default Feed;
