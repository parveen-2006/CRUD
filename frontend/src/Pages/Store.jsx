import React, { useEffect, useState } from "react";
import instance from "../services/api";

export default function Store() {
  const [store, setStore] = useState([]);

  const fetchData = async () => {
    const result = await instance.get("/library");
    console.log(result);
  };
  useEffect(()=>{
    fetchData();
  }, []);

  return <></>;
}
