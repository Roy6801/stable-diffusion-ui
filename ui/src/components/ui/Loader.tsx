"use client";

import { useState, useEffect } from "react";

const symbol: string[] = ["", ".", "..", "..."];

const Loader = ({ text }: { text: boolean | string }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 4);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute z-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center">
      <span className="text-4xl font-black font-mono">
        {text ? text : "Loading"}
        {symbol[count]}
      </span>
    </div>
  );
};

export default Loader;
