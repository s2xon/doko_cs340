const SERVER = "http://localhost:8010"; // Change as necessary

import {Tasks} from '@/components/interfaces'



// Uses the movetask POST api in the go server to increment the StatId of task when clicked on UI
export async function addTask (title: string, desc: string, statId: number) {

    try {
        // See main.go for server info and available queries
        const response = await fetch(`${SERVER}/addtask/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: // add variables
            });
        if (!response.ok) {
            throw new Error (`Failed to move task. Status: ${response.status}`);
        }
        return;

    } catch (error) {
        console.error("Error moving task:", error);
        throw error; 
    }


}