"use client";

import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Button: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "rounded-sm cursor-pointer hover:scale-110 active:scale-75 duration-300 text-sm text-amber-200 hover:text-white hover:drop-shadow-lg font-semibold bg-gradient-to-br hover:bg-gradient-to-tl from-amber-500 to-amber-100 p-[2px]",
        className
      )}
      {...props}
    >
      <div className="flex items-center hover:scale-110 duration-300 justify-center bg-gray-800 hover:bg-gradient-to-tl from-amber-500 to-amber-100 rounded-sm w-full h-full px-6 py-2">
        {children}
      </div>
    </div>
  );
};

export default Button;
