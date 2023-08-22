"use client";

import { useState } from "react";
import { NumberInput, Slider } from "@mantine/core";
import { twMerge } from "tailwind-merge";

interface SliderProps {
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  label: string;
  placeholder: string;
  className?: string;
}

const SliderInput = ({
  defaultValue = 20,
  min = 0,
  max = 100,
  step = 10,
  label = "",
  placeholder = "",
  className = "",
}: SliderProps) => {
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <div className={twMerge("relative", className)}>
      <NumberInput
        value={value}
        onChange={(val) => {
          if (typeof val !== "number") {
            setValue(0);
          } else {
            setValue(val);
          }
        }}
        label={label}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        hideControls
        classNames={{
          input:
            "h-auto pt-5 pb-1 rounded-b-none border-0 focus:border-amber-200 bg-zinc-900 text-amber-100 font-semibold",
          label:
            "absolute pointer-events-none z-[1] p-2 text-amber-200 whitespace-nowrap",
        }}
      />
      <Slider
        max={max}
        step={step}
        min={min}
        label={null}
        value={value}
        onChange={setValue}
        color="yellow"
        size={1}
        radius={0}
        className="absolute w-full -bottom-[1px]"
        classNames={{ thumb: "w-4 h-4", track: "ml-2 mr-5" }}
      />
    </div>
  );
};

export default SliderInput;
