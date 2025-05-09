import {Request, Response} from "express";
import Deck from "../models/Deck.js"

export async function getDecksController(req: Request, res: Response) {
    // const decks will store all of the deck data
    const decks = await Deck.find();
    // Send response of decks as JSON
    res.json(decks)
}
