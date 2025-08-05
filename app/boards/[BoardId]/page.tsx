import Link from "next/link";
import {LoadBoard} from "@/components/load-board"
import {BoardProvider} from '@/components/context'



// interfaces to interpret all the json data pulled from the api call
interface DokoProjProps {
  params: {
    BoardId: number;
  };
}

export default async function DokoProj({ params }: DokoProjProps) {
  const { BoardId } = await params;
  console.log("params object:", params);
  return (
    <>
      <nav>
        <h1>
          <Link href="/">board</Link>
        </h1>
      </nav>
      <section>
      <BoardProvider userId={1} BoardId={BoardId}>
      <LoadBoard/>
      </BoardProvider>
      </section>
    </>
  );
}
