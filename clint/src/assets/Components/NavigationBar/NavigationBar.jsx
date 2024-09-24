import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./NavigationBar.css"
function NavigationBar() {

    return (
        <>
            <nav>
                <div className="logo">
                    <img src="/Images/bookLogo.png" alt="" />
                </div>
                <div className="pagesOption">
                    <span>Home</span>
                    <span>About Us</span>
                    <span>Text Books</span>
                </div>
                <div className="logIn">
                    <Link to="/login">
                        <button>Log In</button>
                    </Link>
                </div >

            </nav >
        </>
    )
}
export default NavigationBar
