"use client";

import { FC } from "react";
import {
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled,
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
  TablerIconsProps,
} from "@tabler/icons-react";
import { ArrowButtonProps } from "@/types";
import { twMerge } from "tailwind-merge";

type Direction = "right" | "left" | "up" | "down";

const directionObj: Record<Direction, FC<TablerIconsProps>> = {
  left: IconArrowBadgeLeftFilled,
  right: IconArrowBadgeRightFilled,
  up: IconArrowBadgeUpFilled,
  down: IconArrowBadgeDownFilled,
};

const ArrowButton: FC<ArrowButtonProps> = ({
  direction,
  onClick,
  className,
}) => {
  const Component = directionObj[direction as Direction];
  return (
    <button
      className={twMerge(
        "flex items-center justify-center hover:scale-105 active:scale-95 duration-100",
        className
      )}
      onClick={onClick}
    >
      <Component size={40} />
    </button>
  );
};

export default ArrowButton;
