"use client"

import React, { useState, useEffect, useContext} from 'react';
import { getBoardData } from '@/app/api/load-boards'; // Import the API function
import { 
    Statuses,
    Tasks,
    Tags,
    BoardData,
 } from '@/components/interfaces';
 import {
    StatusColumn
 } from '@/components/ui/columns'
import {BoardContext} from '@/components/context'
/* 
Sources:
- https://www.convex.dev/typescript/optimization/typescript-catch-error-type
- https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

*/

interface LoadBoardInput {
    userId: number,
    BoardId: number,
}


export function LoadBoard() {
    // Consume the context to get the state and the refresh function
    const { board, loading, error } = useContext(BoardContext);

    // The component now relies entirely on the context for its state
    if (loading) return <div>Loading board...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!board) return <div>No board data found.</div>;

    return (
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 min-h-screen">
            {board.AllStatuses.map(status => (
                <StatusColumn
                    key={status.statId}
                    StatusId={status.statId}
                    StatusTitle={status.title}
                    RelevantTasks={board.AllTasks
                        .filter(task => task.statId === status.statId)}
                />
            ))}
        </div>
    );
};

