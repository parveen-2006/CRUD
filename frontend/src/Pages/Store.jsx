import React, { useEffect, useState } from "react";
import instance from "../services/api";

export default function Store() {
  const [store, setStore] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await instance.get("/library", store);
      console.log(result.data);
    } catch (err) {
      console.log("Fetch Data err : " , err);
    }
  };

  return <>
    <div>{store.map((book)=>{
      return <div key={book._id}>
        <h3>{book.title}</h3>
        <h3>Author : {book.author}</h3>
        <h3>Price : {book.price}</h3>
      </div>
    })}</div>
  </>;
}
