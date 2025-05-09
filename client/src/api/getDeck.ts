import { API_URL } from "./config";

// Declare title and _id types
export type TDeck = {
    title: string;
    _id: string;
};

    
    export async function getDecks(): Promise<TDeck[]> {
        // response is waiting for the deck data from the DB
        const response = await fetch(`${API_URL}/decks`);
        // Convert object by using the object's .json function to be stored as newDecks
        return response.json();
        // setDecks to the fetched JSON decks
    }