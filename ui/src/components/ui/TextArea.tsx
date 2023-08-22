import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: string;
}

const TextArea: FC<TextAreaProps> = ({
  className,
  maxHeight = "none", // Default value is "none"
  ...props
}) => {
  const [value, setValue] = useState(""); // Initialize with an empty value

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, scrollHeight } = event.target;

    // Set the state value based on the textarea content
    setValue(value);

    // Calculate and update the textarea's height based on the content
    event.target.style.height = "auto";
    event.target.style.height = `${scrollHeight}px`;
  };

  useEffect(() => {
    // Reset textarea height if the value becomes empty
    if (value === "") {
      const textareas = document.querySelectorAll("textarea");
      textareas.forEach((textarea) => {
        textarea.style.height = "auto";
      });
    }
  }, [value]);

  return (
    <textarea
      className={twMerge(
        "rounded-md p-2 bg-zinc-800 text-sm text-amber-400 outline-none focus:outline-amber-300 overflow-y-scroll scrollbar",
        className
      )}
      onChange={handleInputChange}
      value={value}
      style={{ maxHeight }} // Apply the maxHeight style
      {...props}
    />
  );
};

export default TextArea;
