"use client";

import { useState, useEffect, useRef } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  data: string[];
  placeholder?: string;
  className?: string;
}

const DropdownInput = ({
  data,
  placeholder = "",
  className,
}: DropdownProps) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(placeholder);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const items = data.map((item) => (
    <div
      key={item}
      className={twMerge(
        "p-2 mr-2 rounded-md hover:pl-4 hover:bg-zinc-700 active:bg-zinc-900",
        `${selected === item && "pl-4 bg-zinc-900"}`
      )}
      onClick={(e) => setSelected(item)}
    >
      {item}
    </div>
  ));

  return (
    <div className={twMerge("relative", className)} ref={dropdownRef}>
      <button
        className="w-full rounded-sm text-md font-bold text-amber-200 hover:text-black hover:drop-shadow-lg bg-gradient-to-br hover:bg-gradient-to-tl from-amber-500 to-amber-200 p-[1px]"
        onClick={(e) => setOpened(!opened)}
      >
        <div
          className={twMerge(
            "flex items-center justify-center bg-zinc-900 hover:bg-gradient-to-tl from-amber-500 to-amber-200 rounded-sm h-full px-0 py-2 flex-1",
            `${
              opened &&
              "bg-gradient-to-tl from-amber-500 to-amber-200 text-black"
            }`
          )}
        >
          <div className="w-5/6 px-2 mx-1">{selected}</div>
          <IconChevronDown
            className={`transition-transform duration-300 w-1/6 ${
              opened && "rotate-180"
            }`}
          />
        </div>
      </button>
      {opened && (
        <div className="absolute left-0 top-full w-full z-10 rounded-md mt-3 p-2 bg-zinc-800 text-amber-400 text-sm">
          <div className="w-full max-h-[200px] scrollbar overflow-x-hidden">
            {items}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
