// Citation for the following function:
// Date: 8/2/2025
// Based on How to Consume REST APIs in React
// Used for understanding and developing the following api calls. Made significant
// changes depending on what the functions used for (for all api functions).
// Source URL: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

const SERVER = "http://classwork.engr.oregonstate.edu:43520";

export async function getTags(taskId: number) {
  console.log(taskId);
  try {
    // See main.go for server info and available queries
    const response = await fetch(`${SERVER}/gettags/${taskId}`);
    if (!response.ok) {
      throw new Error(`HTTP response. Status: ${response.status}`);
    }
    const tags = await response.json();
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

