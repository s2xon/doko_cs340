import Link from "next/link";
import { LoadBoard } from "@/components/load-board";
import { BoardProvider } from "@/components/context";

export default function DokoProj({ params }: { params: { boardId: string } }) {
  // The boardId parameter is passed along from the URL, which is then used to load the board
  // from BoardProvider. BoardProvider (context.tsx) essentially makes the necessary calls to load-boards.tsx api
  // to load all the information. The reason its a "context", is so it can be called to refresh the board after other api calls.
  // FYI: Not super efficient, as the better way to do it is via passing the correct parameters to all the children components and only
  // reload the specific components. Was in too deep before realizing this, so I created a context instead. 
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
