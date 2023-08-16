import Prompt from "@/components/Prompt";
import Feed from "@/components/Feed";

const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-between bg-yellow-100">
      <Prompt />
      <Feed />
    </main>
  );
};

export default Home;
