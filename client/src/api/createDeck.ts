import { API_URL } from "./config";

export async function createDeck(title: string) {
    // Sends a POST request to the AOI at /decks
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        // In order for the backend API to accept the data it must know the type
        headers: {
            'Content-Type': 'application/json', //Data type is Application JSON
        },
        // The backend requires a stringified body 
        body: JSON.stringify({
            title,
        }),
    });
    
    return response.json();
}