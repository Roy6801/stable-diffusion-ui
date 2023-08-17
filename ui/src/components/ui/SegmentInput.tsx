"use client";

import {
  createStyles,
  SegmentedControl,
  SegmentedControlProps,
} from "@mantine/core";

import { twMerge } from "tailwind-merge";

const useStyles = createStyles((theme) => ({
  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}));

const SegmentInput = ({
  data,
  radius = "xl",
  size = "md",
  className = "",
}: SegmentedControlProps) => {
  const { classes } = useStyles();

  return (
    <SegmentedControl
      radius={radius}
      size={size}
      data={data}
      className={className}
      classNames={{
        root: "bg-slate-500",
        indicator: "bg-gradient-to-br from-teal-100 to-teal-600",
        control: classes.control,
        label: twMerge(
          "text-gray-300 hover:text-white data-text-teal-500",
          classes.label
        ),
      }}
    />
  );
};

export default SegmentInput;
