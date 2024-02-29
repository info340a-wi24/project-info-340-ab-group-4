import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'index.css';

function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/images/CurtainCallLogo.png">Seattle Curtain Call</Link>
            </div>
            <nav id="hamburger-nav">
                <label htmlFor="hamburger">&#9776;</label>
                <input type="checkbox" id="hamburger"/>
                <div id="hamburger-items">
                    <NavLink to="/calendar">Events Calendar</NavLink>
                    <NavLink to="/events">Events List</NavLink>
                    <NavLink to="/submission">Events Submission</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header;