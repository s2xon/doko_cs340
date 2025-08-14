const SERVER = "http://classwork.engr.oregonstate.edu:8019"; // Change as necessary

import { Tasks } from "@/components/interfaces";

export async function updateTask(title: string, desc: string, taskId: number) {
  try {
    // See main.go for server info and available queries
    const response = await fetch(`${SERVER}/updatetask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: taskId,
        title: title,
        desc: desc,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to edit task. Status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
}

