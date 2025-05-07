import { config } from 'dotenv';
config();
import express, {Request, Response} from "express";
import mongoose from "mongoose"
import Deck from "./models/Deck.js"

console.log(process.env.MONGO_URL);

// When express function is called return app
const app = express();
const PORT = 5000;

// Express middleware function to use when requests are made to the API
app.use(express.json());

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


