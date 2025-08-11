const SERVER = "http://localhost:8010"; // Change as necessary


// Uses the movetask POST api in the go server to increment the StatId of task when clicked on UI
export async function deleteTask (taskId: number) {

    try {
        // See main.go for server info and available queries
        const response = await fetch(`${SERVER}/deltask/${taskId}`, {method: 'POST'});
        if (!response.ok) {
            throw new Error (`Failed to del task. Status: ${response.status}`);
        }
        return;

    } catch (error) {
        console.error("Error deleting task:", error);
        throw error; 
    }


}