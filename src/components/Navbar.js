import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        // Bootstrap Navbar component
        <nav className='navbar navbar-expand-lg navbar-light ml-3'>
            <div className='container-fluid'>
                {/* Link to the home page */}
                <Link to='/' className='navbar-brand'>Contact List App</Link>
            </div>
        </nav >
    )
}

export default Navbar;
