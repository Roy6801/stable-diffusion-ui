import Parameters from "@/components/Parameters";
import Feed from "@/components/Feed";

const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-between bg-yellow-100">
      <Parameters />
      <Feed />
    </main>
  );
};

export default Home;
