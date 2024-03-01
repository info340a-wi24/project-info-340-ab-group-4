import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

function Footer() {
    return (
        <footer className="footer">
            <ul>
                <li>&copy; Seattle Curtain Call</li>
                <li>Authors: Juliette Jones, Salley Fang, Jason Yu, Chaeri Hong</li>
                <li><NavLink to="mailto:info@seacurtaincall.com">info@seacurtaincall.com</NavLink></li>
            </ul>
        </footer>
    )
}

export default Footer;