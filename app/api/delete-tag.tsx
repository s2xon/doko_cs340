const SERVER = "http://classwork.engr.oregonstate.edu:43520"; // Change as necessary

// Uses the movetask POST api in the go server to increment the StatId of task when clicked on UI
export async function deleteTag(taskId: number, tagId: number) {
  try {
    // See main.go for server info and available queries
    const response = await fetch(`${SERVER}/deltag/${taskId}/${tagId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to del tag. Status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
}

