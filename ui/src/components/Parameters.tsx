import DropdownInput from "./ui/DropdownInput";
import SliderInput from "./ui/SliderInput";
import SegmentInput from "./ui/SegmentInput";
import Button from "./ui/Button";

const Prompt = () => {
  const models = ["compvis", "swayml", "dreamscape"];
  const model = "swayml";

  return (
    <main className="bg-slate-800 min-h-screen w-1/4 px-5 py-10 flex flex-col items-center justify-around">
      <span className="text-xl font-bold text-teal-400 font-mono">
        Stable Diffusion UI
      </span>
      <DropdownInput data={["Compvis", "runwayml"]} />
      <select
        name="models"
        className="w-full my-2 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        {models.map((modelOption, index) => (
          <option
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            key={index}
            value={model}
            disabled={modelOption === model}
          >
            {modelOption}
          </option>
        ))}
      </select>

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
        <span className="text-md font-semibold font-sans mr-5">
          Aspect Ratio
        </span>
        <SegmentInput data={["3:2", "1:1", "2:3"]} className="w-full" />
      </div>

      <div className="flex w-full items-center justify-between mt-2">
        <span className="text-md font-semibold font-sans mr-5">Count</span>
        <SegmentInput data={["1", "2", "3", "4"]} className="w-full" />
      </div>

      <div className="flex w-full items-center justify-between">
        <input
          type="text"
          placeholder="Paste Model Link"
          className="rounded-sm w-2/3 p-2 mr-2"
        />
        <Button>Add</Button>
      </div>
    </main>
  );
};

export default Prompt;
