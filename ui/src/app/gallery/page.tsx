import Link from "next/link";

const Gallery = () => {
  return (
    <main className="h-screen w-screen flex flex-col bg-zinc-900">
      <Link
        href="/"
        className="underline underline-offset-8 mt-4 text-amber-400 hover:text-amber-300 active:text-amber-500"
      >
        Back
      </Link>
    </main>
  );
};

export default Gallery;
