"use client";
import Link from "next/link";
import {resetDB} from '@/app/api/reset'
import { CreateBoardsData } from "@/components/load-board-list";

export default function Home() {
  const handleReset = async () => {
    await resetDB();
    console.log("Database reset initiated!");
    alert("Database has been reset to default");
  };

  return (
    <>
      <nav className="cherry-bomb-one-regular w-full text-3xl h-16 px-4 py-2 flex font-bold border-b border-sky-100">
        <h1>
          <Link href="/">
            do<span className="underline decoration-sky-500">ko</span>
          </Link>
        </h1>
      </nav>
      <section className="p-12">
        <CreateBoardsData userId={1} />
      </section>
      <section className="p-12 pt-0">
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-black">How To Use This Board</h2>
          <p className="text-gray-700">
            Welcome to do<span className="font-bold">ko</span>! This is your personal project management space. You can add new tasks, drag them between columns to update their status, and click on them to see more details. Use the button below only if you want to clear all your data and start over with the default sample board.
          </p>
            <div className="text-gray-700">
              Each Board displayed in the board list leads to its associated task columns. Each Board has three "Status" columns, hosting a number of tasks. 
            </div>            
            <div className="text-gray-700">
              Features:
              <div className="text-gray-700">
                Moving Task: Click the "Move" button on a task to move it to the next status column.
              </div>
              <div className="text-gray-700">
                Edit Task: Click on the task to edit it. Once you're done editing, click Save to confirm the change in the database. 
              </div>
              <div className="text-gray-700">
                Add Task: Click the big grey "Add Task" button at the bottom of all the Tasks within a Status column. This will populate an area where you can fill in the Title and Desc of a task.
              </div >
              <div className="text-gray-700">
                Delete Task: Big ol' "Delete" button next to the Task. Confirm in the window after clicking.
              </div>
              <div className="text-gray-700">
                Delete Tag (M:N): The [x] next to the tag. Confirm after clicking.
              </div>
              <div className="text-gray-700">
                Reset DB: Button below.
              </div>
            </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            RESET
          </button>
        </div>
      </section>
    </>
  );
  }

