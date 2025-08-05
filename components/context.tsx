"use client"


// Citation for the following code:
// Date: 8 / 4 / 2025
// Adapted From Google Gemini
// Source URL: https://gemini.google.com/app/f3f202bd76b18ddd
// Prompted it to help me understand and use "Context" to use it to reload
// The page after moving a task. 



import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { getBoardData } from '@/app/api/load-boards';
import { 
    Statuses,
    Tasks,
    Tags,
    BoardData,
 } from '@/components/interfaces';

interface ContextProps {
    children: ReactNode,
    BoardId: number,
    userId: number

  };

interface BoardContextType {
    board: BoardData | null;
    loading: boolean;
    error: Error | null;
    refreshBoard: () => Promise<void>;
}

const defaultContextValue: BoardContextType = {
    board: null,
    loading: false, // Default to false as there's no data to load initially
    error: null,
    refreshBoard: async () => {},
};

export const BoardContext = createContext<BoardContextType>(defaultContextValue);

export const BoardProvider = ({ children, userId, BoardId }: ContextProps) => {
    const [board, setBoard] = useState<BoardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchBoardData = async () => {
        setLoading(true);
        try {
            const userBoards = await getBoardData(userId, BoardId);
            setBoard(userBoards);
            setError(null);
        } catch (err) {
            console.error("Error loading the board:", err);    
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoardData();
        }, [userId, BoardId]);

    const value: BoardContextType = {
        board,
        loading,
        error,
        refreshBoard: fetchBoardData, // The function to refresh the board data
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
};