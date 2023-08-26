"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Link from "next/link";
import { useLocalStorage } from "@mantine/hooks";

const Settings = () => {
  const [addModel, setAddModel] = useLocalStorage({
    key: "add-model",
    defaultValue: "",
  });

  const [modeRevision, setModelRevision] = useLocalStorage({
    key: "model-revision",
    defaultValue: "",
  });

  const [removeModel, setRemoveModel] = useLocalStorage({
    key: "remove-model",
    defaultValue: "",
  });

  return (
    <main className="h-screen w-screen flex bg-zinc-900 items-center justify-center">
      <div className="w-1/2 h-1/2 flex flex-col items-center justify-around">
        <div className="flex flex-col w-full">
          <span className="text-amber-400 font-semibold mb-2">Add Model</span>
          <div className="flex flex-col lg:flex-row mb-4">
            <TextInput
              placeholder="Model ID"
              className="w-full lg:w-1/2 mb-2 lg:mb-0 mx-1 py-3 lg:py-6"
              state={addModel}
              setState={setAddModel}
            />
            <TextInput
              placeholder="Model Revision"
              className="w-full lg:w-1/2 mx-1 py-3 lg:py-6"
              state={modeRevision}
              setState={setModelRevision}
            />
          </div>
          <Button className="w-1/4 self-end">Add</Button>
        </div>
        <div className="flex flex-col w-full">
          <span className="text-amber-400 font-semibold mb-2">
            Remove Model
          </span>
          <TextInput
            placeholder="Model ID"
            className="w-full mx-1 py-3 lg:py-6 mb-4"
            state={removeModel}
            setState={setRemoveModel}
          />
          <Button className="w-1/4 self-end">Remove</Button>
        </div>

        <Link
          href="/"
          className="underline underline-offset-8 mt-4 text-amber-400 hover:text-amber-300 active:text-amber-500"
        >
          Back
        </Link>
      </div>
    </main>
  );
};

export default Settings;
