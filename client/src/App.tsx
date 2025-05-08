import { useEffect, useState } from 'react'
import './App.css'

// Declare title and _id types
type TDeck = {
  title: string;
  _id: string;
};

function App() {

  // using array destructuring to create and set variables to stateValue and dispatcher
  // State hook for decks and setting decks
  const [decks, setDecks] = useState<TDeck[]>([]);

  // State hook for title and setting title
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    // Sends a POST request to the AOI at /decks
    await fetch("http://localhost:5000/decks", {
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
    // Clear input on button press
    setTitle("");
  }

  // Load decks on website load
  useEffect(() => {
    async function fetchDecks() {
      // response is waiting for the deck data from the DB
      const response = await fetch("http://localhost:5000/decks");
      // Convert object by using the object's .json function to be stored as newDecks
      const newDecks = await response.json();
      // setDecks to the fetched JSON decks
      setDecks(newDecks);
    }
    fetchDecks();
    }, []);
  

  return (
    <div className="App">
      <div className="decks">
        {
          // Map the decks into list items by id and title
          decks.map((deck) => (
            <li key={deck._id}>{deck.title}</li>
          ))
        }
      </div>
      <form onSubmit={handleCreateDeck}> 
        
        <label htmlFor="deck-title">
          Deck Title
        </label>

        <input 
          id="deck-title"
          // The text in the input is updated based on the state
          value={title}
          // When text changes in textbox set the title to the value
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{setTitle(e.target.value)}}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
