import { createStyles, SegmentedControl } from "@mantine/core";
import { SegmentInputProps } from "@/types";
import { twMerge } from "tailwind-merge";

const useStyles = createStyles((theme) => ({
  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.black,
      },
    },
  },
}));

const SegmentInput = ({
  data,
  radius = "xl",
  size = "md",
  state = "",
  setState = () => {},
  className = "",
}: SegmentInputProps) => {
  const { classes } = useStyles();

  return (
    <SegmentedControl
      value={state}
      onChange={setState}
      radius={radius}
      size={size}
      data={data}
      className={className}
      classNames={{
        root: "bg-zinc-900 border-[1px] border-amber-300",
        indicator: "bg-gradient-to-tl from-amber-500 to-amber-200",
        control: classes.control,
        label: twMerge(
          "text-amber-400 hover:text-amber-200 hover:drop-shadow-lg shadow-amber-200",
          classes.label
        ),
      }}
    />
  );
};

export default SegmentInput;
