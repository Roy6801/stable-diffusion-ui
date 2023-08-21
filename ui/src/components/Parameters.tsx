import TextInput from "./ui/TextInput";
import DropdownInput from "./ui/DropdownInput";
import SliderInput from "./ui/SliderInput";
import SegmentInput from "./ui/SegmentInput";
import Button from "./ui/Button";

const Prompt = () => {
  const models = ["compvis", "swayml", "dreamscape", "a", "b", "c", "d", "e"];
  const model = "swayml";

  return (
    <main className="bg-zinc-900 w-screen md:w-1/4 h-screen flex flex-col items-center justify-around p-5">
      <span className="text-sm md:text-xl font-bold text-amber-400 font-mono">
        Stable Diffusion UI
      </span>

      <DropdownInput
        data={models}
        className="w-full"
        placeholder="Select Model"
      />

      <div className="flex items-center justify-between">
        <SliderInput
          defaultValue={50}
          min={10}
          max={80}
          step={1}
          label="Sampling Steps"
          placeholder="Enter steps"
          className="mx-1"
        />

        <SliderInput
          defaultValue={7}
          min={0}
          max={30}
          step={1}
          label="Guidance Scale"
          placeholder="Enter scale"
          className="mx-1"
        />
      </div>

      <div className="flex w-full items-center justify-between mt-2">
        <span className="text-md text-amber-400 font-semibold font-sans mr-5">
          Aspect Ratio
        </span>
        <SegmentInput data={["3:2", "1:1", "2:3"]} className="w-full" />
      </div>

      <div className="flex w-full items-center justify-between mt-2">
        <span className="text-md text-amber-400 font-semibold font-sans mr-5">
          Count
        </span>
        <SegmentInput data={["1", "2", "3", "4"]} className="w-full" />
      </div>

      <div className="flex w-full items-center justify-between">
        <TextInput placeholder="Paste Model ID/Link" className="w-2/3" />
        <Button>Add</Button>
      </div>
    </main>
  );
};

export default Prompt;
