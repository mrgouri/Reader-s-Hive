import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    genre: { type: String, required: true },
    image: { type: String },
    condition: { type: String, required: true },
    language: { type: String, required: true },
    price: { type: String, required: true },
    age: { type: String, required: true },
    binding: { type: String, required: true },
    isSold: { type: Number},
    userSold: { type: String },
    userBuy: { type: [String], },
    address: {type: [String],},
    
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export  default Book;
