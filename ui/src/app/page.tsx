import Parameters from "@/components/Parameters";
import Feed from "@/components/Feed";

const Home = () => {
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row">
      <Parameters />
      <Feed />
    </main>
  );
};

export default Home;
