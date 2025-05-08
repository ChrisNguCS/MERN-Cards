import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState("");

  function handleCreateDeck(e: React.FormEvent){
    e.preventDefault();
    // Sends a POST request to the api at /decks
    fetch("http://localhost:5000/decks", {
      method: 'POST',
      // In order for the backend API to accept the data it must know the type
      headers: {
        'Content-Type': 'application/json', // Add this header
      },
      // The backend requires a stringified body 
      body: JSON.stringify({
        title,
      }),
    });
  }

  return (
    <div className="App">
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
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
