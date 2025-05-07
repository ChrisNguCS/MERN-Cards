import express, {Request, Response} from "express";
import mongoose from "mongoose"
import Deck from "./models/Deck.js"

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
mongoose.connect(
    "mongodb+srv://chrisngucs:uYWKl2X6skpr3DUm@cluster0.8ksyzwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log(`Listening on port: ${PORT}`);
    app.listen(PORT);
})


