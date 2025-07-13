import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BoardPreview } from "@/components/board-preview";
const details = [
  {
    project: "dokoProj",
    lastUpdated: "Jul 11 2024: 12:40PM",
    tasks: "12 Tasks Remaining",
  },
];

export default function Home() {
  return (
    <>
      <nav className="cherry-bomb-one-regular w-full text-3xl h-16 px-4 py-2 flex font-bold  border-b-1 border-sky-100">
        <h1>
          <Link href="/">
            do<span className="underline decoration-sky-500">ko</span>
          </Link>
        </h1>
      </nav>
      <section className="p-12">
        {" "}
        <BoardPreview details={details} />
      </section>
    </>
  );
}
