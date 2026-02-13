const mongoose = require("mongoose")

const SchemaBooks = new mongoose.Schema({
    title : String, 
    Author : String, 
    Price : Number
})

const Book = mongoose.model("Book" , SchemaBooks);

module.exports  = Book;