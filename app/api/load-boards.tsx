// Creating the fetch calls for loading a User's boards.
// Referenced this for developing:
// https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

const SERVER = "http://localhost:8010"; // Change as necessary

/* 
The idea for this function is to provide the "details" 
for the BoardPreview component, loading all the basic board 
info (for each board). Will be called on via "useState" and
"useEffect" within relevant components.
*/
export async function getBoards (userId: number){
    try {
        // See main.go for server info and available queries
        const response = await fetch(`${SERVER}/users/${userId}/boards`);
        if (!response.ok) {
            // nuke iran
            throw new Error (`HTTP response. Status: ${response.status}`);
        }
        const boardData = await response.json();
        // console.log(boardData);
        return boardData;

    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; 
    }


}