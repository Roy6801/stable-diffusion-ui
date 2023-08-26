import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  state?: string;
  setState?: (val: string | ((prevState: string) => string)) => void;
}

const TextInput: FC<TextInputProps> = ({
  className,
  state = "",
  setState = () => {},
  children,
  ...props
}) => {
  return (
    <input
      type="text"
      className={twMerge(
        "rounded-md p-2 bg-zinc-800 text-sm text-amber-400 outline-none focus:outline-amber-300",
        className
      )}
      defaultValue={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
      {...props}
    />
  );
};

export default TextInput;
