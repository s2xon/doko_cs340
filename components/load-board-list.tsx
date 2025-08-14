// Citations for the following code:
// #1
// Date: 7/31/2025
// Based on How to Consume REST APIs in React – a Beginner's Guide
// Used for understanding how to use the "useEffect" react feature to call api functions and load relevant board data.
// Source URL: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/
// Citations for the following code:
// #2
// Date: 7/31/2025
// Based on TypeScript Error Type Handling in Try-Catch Blocks
// Used for debugging.
// Source URL: https://www.convex.dev/typescript/optimization/typescript-catch-error-type


"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from 'react';
import { getBoards } from '@/app/api/load-boards'; // Import the API function
import { Board } from '@/components/interfaces';


export function CreateBoardsData ({ userId }: { userId: number }) {
    // State variables, starts with Loading as true.

    const [boards, setBoards] = useState<Board[]>([]); // set to empty array
    const [loading, setLoading] = useState(true);
    // have to explicitely define the state as either Error or null (bc of ts)
    const [error, setError] = useState<Error | null>(null); 

    useEffect(() => {
        const fetchBoards = async () => {
        try {
            const userBoards = await getBoards(userId);
                setBoards(userBoards);
        } catch (err) {
            // Necessary if/else statement to ensure types are proper
            if (err instanceof Error) {
                setError(err);  
            } else {
                setError (new Error (String(err)));
            }
        } finally {
            setLoading(false);
        }
        };

        fetchBoards();
    }, [userId]);
    // returning errors to UI
    if (loading) return <div>Loading user...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!boards) return <div>No user found.</div>;


return (
    <Table>
      <TableCaption>A list of your Boards.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="fill">Board</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boards.map((board: Board) => (
          <TableRow key={board.BoardId}>
            <TableCell>{board.BoardId}</TableCell>            
            <TableCell className="font-medium">
              <Button asChild variant="outline" className="wrap p-0">
                <Link href={`boards/${board.BoardId}`} className="w-full">
                {board.title}
                </Link>
              </Button>
              
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

};
// export function UserBoards()