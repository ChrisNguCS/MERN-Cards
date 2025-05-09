import {Request, Response} from "express";
import Deck from "../models/Deck.js"

export async function deleteDecksController(req: Request, res: Response) {
    // The parameters of delete should include the ID
    const deckId = req.params.deckId;
    // Once we have ID then we can find and delete it
    const deck = await Deck.findByIdAndDelete(deckId);
    // Result returns the deleted item
    res.json(deck);
}
