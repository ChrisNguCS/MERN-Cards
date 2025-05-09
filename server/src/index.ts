import { config } from 'dotenv';
config();

import express, {Request, Response} from "express";
import mongoose from "mongoose"
import cors from "cors"
import Deck from "./models/Deck.js"
import { getDecksController } from "./controllers/getDeckController.js";
import { deleteDecksController } from "./controllers/deleteDeckController.js";
import { createDecksController } from "./controllers/createDeckController.js";

// When express function is called return app
const PORT = 5000;
const app = express();

//CORS allows certain things to make requests to the server
app.use(
    cors({
        origin: '*',
    })
);

// Use Express as middleware function to use when requests are made to the API
app.use(express.json());

// GET request to return decks to user
app.get("/decks", getDecksController);

// POST request create new deck model
app.post("/decks", createDecksController);


app.delete("/decks/:deckId", deleteDecksController);

// Connection to mongoDB using mongoose
mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening on port: ${PORT}`);
    app.listen(PORT);
});