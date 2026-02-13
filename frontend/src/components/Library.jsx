import React, { useEffect } from "react";
import { useState} from "react";
import instance from "../services/api";

export default function Library() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      

 let result = await instance.post("/library" , formData);
 
if(result.success){
    
}




    }catch(err){
        console.log("librabry err" , err);

    }



    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev =>({
        ...prev ,
         [name] : value
    }));
  };
  return (
    <>
      <div className="library">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            required
          />
          <br /> <br />
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author Name"
            required
          />
          <br /> <br />
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
