import { twMerge } from "tailwind-merge";

interface FeedProps {
  className?: string;
  state?: string[];
}

const Feed = ({ className = "", state = [] }: FeedProps) => {
  return (
    <main
      className={twMerge("flex-1 flex items-center justify-center", className)}
    >
      {state.length > 0 ? (
        <div className="w-full h-full flex">
          {state.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${image}`}
              className="m-1"
            />
          ))}
        </div>
      ) : (
        <span className="text-6xl font-black text-zinc-800">
          Stable Diffusion
        </span>
      )}
    </main>
  );
};

export default Feed;
