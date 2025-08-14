// Citation for the following function:
// Date: 8/2/2025
// Based on How to Consume REST APIs in React
// Used for understanding and developing the following api calls. Made significant
// changes depending on what the functions used for (for all api functions).
// Source URL: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

const SERVER = "http://classwork.engr.oregonstate.edu:43520"; // Change as necessary

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

