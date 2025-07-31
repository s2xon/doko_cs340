"use client"

import React, { useState, useEffect } from 'react';
import { getBoardData } from '@/app/api/load-boards'; // Import the API function
import { 
    Statuses,
    Tasks,
    Tags,
    BoardData,
 } from '@/components/interfaces';
/* 
Sources:
- https://www.convex.dev/typescript/optimization/typescript-catch-error-type
- https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

*/

interface LoadBoardInput {
    userId: number,
    BoardId: number,
}


export function LoadBoard ({userId, BoardId} : LoadBoardInput) {
    // State variables, starts with Loading as true.

    const [board, setBoard] = useState<BoardData | null>(null); // set to empty array
    const [loading, setLoading] = useState(true);
    // have to explicitely define the state as either Error or null (bc of ts)
    const [error, setError] = useState<Error | null>(null); 


    useEffect(() => {
        const fetchBoard = async () => {
        try {
            const userBoards = await getBoardData(userId, BoardId);
                setBoard(userBoards);
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

        fetchBoard();
    }, [userId, BoardId]);
    // returning errors to UI
    if (loading) return <div>Loading board...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!board) return <div>No board data found.</div>;

    return (
        <div>
        {board.AllStatuses.map(status => (

        <div key={status.statId}>
          <h2>{status.title}</h2>
          <ul>
            {board.AllTasks
              .filter(task => task.statId === status.statId)
              .map(task => (
                <li key={task.taskId}>
                  {task.title} - {task.desc}
                </li>
              ))}
          </ul>
        </div>

        ))}
        </div>
    )
};

