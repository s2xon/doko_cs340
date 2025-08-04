// Citation for the following code:
// Date: 8 / 4 / 2025
// Adapted From Google Gemini
// Source URL: https://gemini.google.com/app/d94eaadbeb6b9467
// Explained that I wanted to create three columns for statuses and buttons for the tasks. Did not provide any code.
// I adapted the code it provided to what I wanted, mostly copying the html and cn (classNames css).





import React, { useState, useEffect } from 'react';
import { 
    Statuses,
    Tasks,
    Tags,
    BoardData,
 } from '@/components/interfaces';



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
      </div>
    </div>

    )

}

function TaskBar ({taskId, title, desc, statId} : Tasks) {

    return (
        <button
            // onClick={() => HandleMoveTask(taskId)} // Call onMoveTask when button is clicked
            className="w-full bg-black-500 hover:bg-grey-600 text-black font-semibold py-3 px-4 rounded-lg shadow-md flex justify-between items-center transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            <span className="text-lg">{title}</span>
            <span className="text-lg">{desc}</span>
        </button>


    )
}

//     async function HandleMoveTask (taskId: number) {
        // Create the action to move the task, nd update DB
//   };


export {
    StatusColumn

}