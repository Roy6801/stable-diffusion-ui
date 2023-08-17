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
        className=""
        classNames={{
          input:
            "h-auto pt-5 pb-1 rounded-b-none border-slate-600 bg-slate-600 text-white",
          label: "absolute pointer-events-none z-[1] p-2 text-white",
        }}
      />
      <Slider
        max={max}
        step={step}
        min={min}
        label={null}
        value={value}
        onChange={setValue}
        size={1}
        radius={0}
        className="absolute w-full -bottom-[1px]"
        classNames={{ thumb: "w-4 h-4" }}
      />
    </div>
  );
};

export default SliderInput;
