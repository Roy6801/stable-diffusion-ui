const Prompt = () => {
  const models = ["compvis", "swayml", "dreamscape"];
  const model = "swayml";

  return (
    <main className="bg-slate-800 min-h-screen w-1/4 px-5 py-10 flex flex-col items-center">
      <span className="text-xl font-bold text-teal-400 font-mono">
        Stable Diffusion UI
      </span>
      <select
        name="models"
        className="w-full my-6 text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
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

      <span className="text-md font-semibold font-sans mt-5 self-start">
        Sample Steps
      </span>
      <div className="flex w-full items-center m-3">
        <input type="range" min={10} max={80} className="flex-1 mr-4" />
        <input type="number" className="w-1/6" />
      </div>
    </main>
  );
};

export default Prompt;
