// Referenced this for developing:
// https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

const SERVER = "http://classwork.engr.oregonstate.edu:43520"; // Change as necessary

import { Tasks } from "@/components/interfaces";

export async function addTask(title: string, desc: string, statId: number) {
  try {
    // See main.go for server info and available queries
    const response = await fetch(`${SERVER}/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statId: statId,
        title: title,
        desc: desc,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to add task. Status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

