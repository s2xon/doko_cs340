// Creating the fetch calls for loading a User's boards.
// Referenced this for developing:
// https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

const SERVER = "http://classwork.engr.oregonstate.edu:8019"; // Change as necessary

// Uses the movetask POST api in the go server to increment the StatId of task when clicked on UI
export async function moveTask(taskId: number) {
  try {
    // See main.go for server info and available queries
    const response = await fetch(`${SERVER}/movetask/${taskId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to move task. Status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Error moving task:", error);
    throw error;
  }
}

