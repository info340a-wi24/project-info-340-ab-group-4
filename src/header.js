import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="/images/CurtainCallLogo.png" alt="Logo with gold theatrical curtains that says Seattle Curtain Call" />
                </Link>
            </div>
            <nav className='hamburger-nav'>
                <label htmlFor="hamburger">&#9776;</label>
                <input type="checkbox" id="hamburger" className='hamburger'/>
                <div className='hamburger-items'>
                    <Link to="/calendar">Event Calendar</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/submission">Event Submission</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;