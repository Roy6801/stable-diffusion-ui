"use client";

import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "@/types";

const Button: FC<ButtonProps> = ({
  className,
  buttonColor = "bg-zinc-900",
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-sm active:scale-75 duration-150 text-sm text-amber-200 hover:text-black font-semibold bg-gradient-to-br hover:bg-gradient-to-tl from-amber-500 to-amber-200 p-[1px]",
        className
      )}
      {...props}
    >
      <div
        className={twMerge(
          "flex items-center justify-center hover:bg-gradient-to-tl from-amber-500 to-amber-200 rounded-sm w-full h-full px-6 py-2",
          buttonColor
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
