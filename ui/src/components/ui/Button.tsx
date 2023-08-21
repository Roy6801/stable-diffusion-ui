"use client";

import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "rounded-sm active:scale-75 duration-300 text-sm text-amber-200 hover:text-black hover:drop-shadow-lg font-semibold bg-gradient-to-br hover:bg-gradient-to-tl from-amber-500 to-amber-200 p-[1px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center bg-zinc-900 hover:bg-gradient-to-tl from-amber-500 to-amber-200 rounded-sm w-full h-full px-6 py-2">
        {children}
      </div>
    </button>
  );
};

export default Button;
