import { config } from 'dotenv';
config();

import express, {Request, Response} from "express";
import mongoose from "mongoose"
import cors from "cors"
import Deck from "./models/Deck.js"

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
app.get("/decks", async (req: Request, res: Response) => {
    // const decks will store all of the deck data
    const decks = await Deck.find();
    console.log(decks);
    // Send response of decks as JSON
    res.json(decks)
});


// POST request create new deck model
app.post("/decks", async (req: Request, res: Response) => {

    // Instantiate new Deck Object
    const newDeck = new Deck({
        title: req.body.title,
    });
    
    // Save the deck after creating a new Deck
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

// Connection to mongoDB using mongoose
mongoose.connect
    (process.env.MONGO_URL!).then(() => {
        console.log(`Listening on port: ${PORT}`);
        app.listen(PORT);
        }
    );