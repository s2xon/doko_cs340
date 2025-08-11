// Citation for the following code:
// Date: 8 / 4 / 2025
// Adapted From Google Gemini
// Source URL: https://gemini.google.com/app/d94eaadbeb6b9467
// Explained that I wanted to create three columns for statuses and buttons for the tasks. Did not provide any code.
// I adapted the code it provided to what I wanted, mostly copying the html and cn (classNames css). Also helped with 
// tailwind css in most places...



import React, { useState, useEffect, useContext } from 'react';
import { 
    Statuses,
    Tasks,
    Tags,
    BoardData,
} from '@/components/interfaces';

import {moveTask} from '@/app/api/move-task'
import {addTask} from '@/app/api/add-task'
import {deleteTask} from '@/app/api/delete-task'
import {BoardContext} from '@/components/context'




interface StatusVars {
    StatusId: number,
    StatusTitle: string,
    RelevantTasks: Tasks[],
}

function StatusColumn ({StatusId, StatusTitle, RelevantTasks} : StatusVars) {
    return (
        <div className="w-full md:w-1/3 bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col items-center transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-grey-400 pb-2 w-full text-center">
            {StatusTitle}
            </h2>
        <div className="w-full space-y-4">
        {/* Render each task within this column */}
        {RelevantTasks.length > 0 ? (
            RelevantTasks.map((task) => (
                <TaskBar key={task.taskId} statId={task.statId} taskId={task.taskId} title={task.title} desc={task.desc}/>

        ))
        ) : (
        <p className="text-gray-500 text-center py-4">No tasks here yet!</p>
        )}
        <AddTask statId={StatusId} />
    </div>
    </div>

    )

}


export function TaskBar({ taskId, title, desc, statId }: Tasks) {
    const { refreshBoard } = useContext(BoardContext);

    // This is the event handler function
    const HandleMoveTask = async () => {
        console.log("current statid:", statId);
        if ((statId % 3) !== 0) {
            try {
                await moveTask(taskId);
                refreshBoard(); 
            } catch (err) {
                console.error("Error handling task move and refresh:", err);
            }
        } else {
            console.log("grrrr, no moving now.");
        }
    };
        const HandleDeleteTask = async () => {
        // Optional: Add a confirmation dialog before deleting
        if (window.confirm(`Are you sure you want to delete the task: "${title}"?`)) {
            try {
                await // deleteTask(taskId);
                refreshBoard();
            } catch (err) {
                console.error("Error deleting task:", err);
            }
        }
    };

    return (
        <div className="w-full bg-gray-200 text-black font-semibold py-3 px-4 rounded-lg shadow-md flex justify-between items-center transition-all duration-200 ease-in-out">
            <div className="flex-grow">
                <span className="text-lg block">{title}</span>
                <span className="text-sm text-gray-600">{desc}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <button
                    onClick={HandleMoveTask}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Move
                </button>
                <button
                    onClick={HandleDeleteTask}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Delete
                </button>
            </div>
        </div>
    );
}

export function AddTask({ statId }: { statId: number }) {
    const { refreshBoard } = useContext(BoardContext);
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleAddTaskClick = () => {
        setIsAdding(true);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setTitle("");
        setDesc("");
    };

    const handleSubmit = async (handle: React.FormEvent) => {
        handle.preventDefault();
        if (!title.trim()) return; // Do not add empty tasks

        try {
            // await addTask( title, desc, statId );
            refreshBoard();
            handleCancel(); // Reset the form
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    if (!isAdding) {
        return (
            <button
                onClick={handleAddTaskClick}
                className="w-full bg-gray-500 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg shadow-md flex justify-center items-center transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                <span className="text-lg">+ Add Task</span>
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full p-4 bg-gray-100 rounded-lg shadow-inner">
            <input
                type="text"
                value={title}
                onChange={(handle) => setTitle(handle.target.value)}
                placeholder="Task Title"
                className="w-full p-2 mb-2 border-2 border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
            />
            <textarea
                value={desc}
                onChange={(handle) => setDesc(handle.target.value)}
                placeholder="Task Description"
                className="w-full p-2 mb-2 border-2 border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
                rows={3}
            />
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={handleCancel} className="px-4 py-2 font-semibold text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 
                font-semibold 
                text-white 
                bg-green-500 
                rounded-md 
                hover:bg-green-600">
                    Submit
                </button>
            </div>
        </form>
    );
}





export {
    StatusColumn

}