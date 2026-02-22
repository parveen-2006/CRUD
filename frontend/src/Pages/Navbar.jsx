import React from 'react'
import { Link  } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className='navbar'>
            <div className='nav-links'>
                <Link to="/">Library</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/store">Store</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    </div>
  )
}
