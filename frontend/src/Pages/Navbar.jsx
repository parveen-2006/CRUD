import React from 'react'
import { Link  } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <nav className='navbar'>
            <div className='nav-links'>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    </div>
  )
}
