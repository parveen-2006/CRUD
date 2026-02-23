const mongoose = require("mongoose")
const {Schema} = mongoose;
const SchemaBooks = new Schema({
    title : String, 
   description : String, 
    Price : Number,
    Author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

const Book = mongoose.model("Book" , SchemaBooks);

module.exports  = Book;