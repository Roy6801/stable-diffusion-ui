import { twMerge } from "tailwind-merge";

const Feed = ({ className = "" }: { className?: string }) => {
  return <main className={twMerge("flex-1", className)}></main>;
};

export default Feed;
