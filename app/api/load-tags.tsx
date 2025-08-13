const SERVER = "http://localhost:8010";

export async function getTags(taskId: number){
    console.log(taskId);
    try {
        // See main.go for server info and available queries
        const response = await fetch(`${SERVER}/gettags/${taskId}`);
        if (!response.ok) {
            throw new Error (`HTTP response. Status: ${response.status}`);
        }
        const tags = await response.json();
        return tags;

    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error; 
    }


}