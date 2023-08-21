"use client";

import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const TextInput: FC<HTMLAttributes<HTMLInputElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <input
      type="text"
      className={twMerge(
        "rounded-md p-2 bg-zinc-800 text-sm text-amber-400 outline-none focus:outline-amber-300",
        className
      )}
      {...props}
    />
  );
};

export default TextInput;
