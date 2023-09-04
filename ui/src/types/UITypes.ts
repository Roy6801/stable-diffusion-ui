import { HTMLAttributes, LegacyRef } from "react";
import { SegmentedControlProps } from "@mantine/core";
import { ImageProps } from ".";

interface StateUpdate<T, U> {
  state?: T;
  setState?: (val: T | ((prevState: T) => T)) => U;
}

interface TextInputProps
  extends StateUpdate<string, void>,
    HTMLAttributes<HTMLInputElement> {}

interface TextAreaProps
  extends StateUpdate<string, void>,
    HTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
}

interface SegmentInputProps
  extends StateUpdate<string, void>,
    SegmentedControlProps {}

interface SliderProps extends StateUpdate<number, void> {
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  label: string;
  placeholder: string;
  className?: string;
}

interface DropdownProps extends StateUpdate<string, void> {
  data: string[];
  placeholder: string;
  className?: string;
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonColor?: string;
  disabled?: boolean;
}

interface ArrowButtonProps extends HTMLAttributes<HTMLButtonElement> {
  direction: "right" | "left" | "up" | "down";
}

interface PromptDetailProps {
  onClose: () => void;
  imageIndex: number;
  images: ImageProps[];
  setNext: () => void;
  setPrev: () => void;
}

interface GalleryProps {
  serverUrl: string;
  date: string;
}

interface GridProps {
  images: ImageProps[];
  infinite: LegacyRef<HTMLDivElement> | undefined;
  loading: boolean;
}

interface GridImageProps {
  image: ImageProps;
  onClick: () => void;
}

export type {
  TextInputProps,
  TextAreaProps,
  SliderProps,
  SegmentInputProps,
  DropdownProps,
  ButtonProps,
  ArrowButtonProps,
  PromptDetailProps,
  GalleryProps,
  GridProps,
  GridImageProps,
};
