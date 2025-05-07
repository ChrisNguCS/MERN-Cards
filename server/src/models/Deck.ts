import mongoose from "mongoose"

// Defining a model through Schema interface
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DeckSchema = new Schema({
    title: String,
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;