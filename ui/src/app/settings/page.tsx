"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Link from "next/link";
import { useLocalStorage } from "@mantine/hooks";
import DropdownInput from "@/components/ui/DropdownInput";

interface AddModelProps {
  tag: string;
  revision: string;
}

interface RemoveModelProps {
  tag: string;
}

const Settings = () => {
  const [models, setModels] = useState<object>({});

  const [addModel, setAddModel] = useLocalStorage({
    key: "add-model",
    defaultValue: "",
  });

  const [modelRevision, setModelRevision] = useLocalStorage({
    key: "model-revision",
    defaultValue: "",
  });

  const [removeModel, setRemoveModel] = useLocalStorage({
    key: "remove-model",
    defaultValue: "",
  });

  const [serverUrl] = useLocalStorage({
    key: "server-url",
    defaultValue: "",
  });

  const fetchModels = () => {
    if (serverUrl !== "") {
      const url = serverUrl.replace("localhost", "127.0.0.1");

      fetch(`${url}/get_models`, {
        cache: "no-store",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setModels(res);
        })
        .catch((err) => {
          console.log(err);
          setModels({});
        });
    }
  };

  const handleAddModel = async () => {
    if (serverUrl !== "") {
      const url = serverUrl.replace("localhost", "127.0.0.1");

      const headers = {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      };

      const modelInfo: AddModelProps = {
        tag: addModel,
        revision: modelRevision,
      };

      const added = await (
        await fetch(`${url}/add_model`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(modelInfo),
        })
      ).json();

      console.log(added);

      fetchModels();
    }
  };

  const handleRemoveModel = async () => {
    if (serverUrl !== "") {
      const url = serverUrl.replace("localhost", "127.0.0.1");

      const headers = {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      };

      const modelInfo: RemoveModelProps = {
        tag: removeModel,
      };

      const removed = await (
        await fetch(`${url}/remove_model`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(modelInfo),
        })
      ).json();

      console.log(removed);

      fetchModels();
      setRemoveModel("");
    }
  };

  useEffect(() => {
    fetchModels();
  }, [serverUrl]);

  return (
    <main className="h-screen w-screen flex bg-zinc-900 items-center justify-center p-2">
      <div className="w-full h-full flex flex-col items-center justify-around overflow-x-hidden scrollbar p-5">
        <div className="flex flex-col w-full md:w-2/3 mt-16">
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
              state={modelRevision}
              setState={setModelRevision}
            />
          </div>
          <Button className="w-1/4 self-end" onClick={handleAddModel}>
            Add
          </Button>
        </div>
        <div className="flex flex-col w-full md:w-2/3">
          <span className="text-amber-400 font-semibold mb-2">
            Remove Model
          </span>
          <DropdownInput
            data={Object.keys(models)}
            placeholder="Model"
            className="w-full mx-1 py-3 lg:py-6 mb-4"
            state={removeModel}
            setState={setRemoveModel}
          />
          <Button className="w-1/4 self-end" onClick={handleRemoveModel}>
            Remove
          </Button>
        </div>

        <Link
          href="/"
          className="underline underline-offset-8 mx-4 text-amber-400 hover:text-amber-300 active:text-amber-500"
        >
          Back
        </Link>
      </div>
    </main>
  );
};

export default Settings;
