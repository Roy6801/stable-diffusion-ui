import { twMerge } from "tailwind-merge";

const Feed = ({ className = "" }: { className?: string }) => {
  return (
    <main
      className={twMerge("flex-1 flex items-center justify-center", className)}
    >
      <span className="text-6xl font-black text-zinc-800">
        Stable Diffusion
      </span>
    </main>
  );
};

export default Feed;
