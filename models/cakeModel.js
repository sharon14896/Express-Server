import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
    type: String,
    price: Number,
    category: String
})

export const CakeModel = mongoose.model("cakes", cakeSchema)