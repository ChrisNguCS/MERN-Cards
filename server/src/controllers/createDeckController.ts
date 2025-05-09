import {Request, Response} from "express";
import Deck from "../models/Deck.js"

export async function createDecksController(req: Request, res: Response) {
    // Instantiate new Deck Object
    const newDeck = new Deck({
        title: req.body.title,
    });
    
    // Save the deck after creating a new Deck
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
}
