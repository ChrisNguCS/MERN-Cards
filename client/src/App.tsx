import { useEffect, useState } from 'react'
import { Link } from "react-router";
import './App.css'
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, type TDeck } from "./api/getDeck";
import { createDeck } from "./api/createDeck";


function App() {

  // using array destructuring to create and set variables to stateValue and dispatcher
  // State hook for decks and setting decks
  const [decks, setDecks] = useState<TDeck[]>([]);

  // State hook for title and setting title
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    // 1:56:20
    const deck = await createDeck(title);
    setDecks([...decks, deck])
    // Clear input on button press
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string){
    await deleteDeck(deckId);
    // 1:55:20
    // Optimistic update to remove deck from client screen without refreshing
    setDecks(decks.filter((deck) => deck._id!== deckId));
  }

  // Load decks on website load
  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      // setDecks to the fetched JSON decks
      setDecks(newDecks);
    }
    fetchDecks();
    }, []);
  

  return (
    <div className="App">
      <ul className="decks">
        {
          // Map the decks into list items by id and title
          decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>
                X
              </button>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))
        }
      </ul>
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
