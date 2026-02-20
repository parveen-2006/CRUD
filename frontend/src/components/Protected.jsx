import React from 'react'
import {Navigate , Outlet} from 'react-router-dom';



export default function Protected() {
  let token = localStorage.getItem("token");

  if(!token){
    
    window.location.href = "/login";
    alert("not authorized to this route")
  }

return <Outlet/>

}
