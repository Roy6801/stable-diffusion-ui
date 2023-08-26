import { FC, HTMLAttributes, useEffect, useState, ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
  state?: string;
  setState?: (val: string | ((prevState: string) => string)) => void;
}

const TextArea: FC<TextAreaProps> = ({
  className,
  maxHeight = "none", // Default value is "none"
  state = "",
  setState = () => {},
  ...props
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, scrollHeight } = event.target;

    // Set the state value based on the textarea content
    setState(value);

    // Calculate and update the textarea's height based on the content
    event.target.style.height = "auto";
    event.target.style.height = `${scrollHeight}px`;
  };

  useEffect(() => {
    // Reset textarea height if the value becomes empty
    if (state === "") {
      const textareas = document.querySelectorAll("textarea");
      textareas.forEach((textarea) => {
        textarea.style.height = "auto";
      });
    }
  }, [state]);

  return (
    <textarea
      className={twMerge(
        "rounded-md p-2 bg-zinc-800 text-sm text-amber-400 outline-none focus:outline-amber-300 overflow-y-scroll scrollbar",
        className
      )}
      onChange={handleInputChange}
      value={state}
      style={{ maxHeight }} // Apply the maxHeight style
      {...props}
    />
  );
};

export default TextArea;
