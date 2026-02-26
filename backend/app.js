const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Book = require("./Model/library.js");
const jwt = require("jsonwebtoken");
const User = require("./Model/User.js");
const Port = process.env.Port || 3000;
const userRouter = require("./Routes/userRouter.js");
const authVerify = require("./auth/authVerify.js");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/crud");
}
app.use(cors());
app.use(express.json());
//userRoutes
app.use("/user", userRouter);
//AuthVerify
app.use("/auth" , authVerify)


//routes
app.get("/library", async (req, res) => {
  try {
    const books = await Book.find().populate("Author");
    res.status(200).json({
      success : true,
      data : books
    });
  } catch (err) {
    res.status(500).json({
      message: "error fetching books",
    });
  }
});

app.get("/store" , authVerify , async(req,res) => {
  try{
   const user = req.user;
   const {email} = user;
   const userDetails = await User.findOne({email}).populate("books");
   
   return res.status(200).json({
    success : true,
    data : 
      userDetails,
    
   })

  }catch(err){
console.log("store route err" , err);
return res.status(500).json({
  succes : false,
  message : "server err" || err.name
})

  }
})





//create route
app.post("/library", authVerify ,async (req, res) => {
  try {
    let { title, Price , description} = req.body;
    console.log(req.body);
    const user = req.user; // <--accessing it from authVerify!
   
    //validation;
    if (!title || !Price || !description) {
      console.log("fill your data");
      res.status(404).json({
        success: false,
        message: "fill your data",
      });
    }

    let newBook = new Book({
      title,
      description, 
      Price,
      Author : user._id
    });

  const result = await newBook.save(); 
   const {email} = user;
  const currentUser = await User.findOne({email}); // <--- this for email 
 
  currentUser.books.push(result._id);
  
  await currentUser.save();
 

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (err) {
    console.log("create : ", err);

    res.status(500).json({
      success: false,
      message: "inventory Server Error",
    });
  }
});




//delete route
app.delete("/library/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).json({
        success: false,
        message: "book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "book removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//UPDATE route
app.put("/library/:id", authVerify , async (req, res) => {
  try {
    const { id } = req.params;
    const { title, Author, Price } = req.body;
    console.log(req.body);

    //validation
    if (!title || !Author || !Price) {
      console.log("fill your data");
      return res.status(404).json({
        success: false,
        message: "fill your data",
      });
    }

    const updateBook = await Book.findByIdAndUpdate(
      id,
      { title, Author, Price },
      { new: true },
    );
    if (!updateBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "book updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error123",
    });
  }
});

app.listen(Port, () => {
  console.log(`localhost:${Port}`);
});
