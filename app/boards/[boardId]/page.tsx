import Link from "next/link";
import { LoadBoard } from "@/components/load-board";
import { BoardProvider } from "@/components/context";

export default function DokoProj({ params }: { params: { boardId: string } }) {
  const { boardId } = params;

  const boardNum = parseInt(boardId, 10);

  if (isNaN(boardNum)) {
    return <div>Error: Invalid Board ID provided in the URL.</div>;
  }

  return (
    <>
      <nav>
        <h1>
          <Link href="/">board</Link>
        </h1>
      </nav>
      <section>
        <BoardProvider userId={1} BoardId={boardNum}>
          <LoadBoard />
        </BoardProvider>
      </section>
    </>
  );
}
