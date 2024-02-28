import React from 'react';
import Header from './header';
import Footer from './footer';

// don't know if we'll need all of these but just took them from problem-set-08 App.js
import { Routes, Route, Navigate, Link} from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <Router>
                <Header />
                
                <Footer />
            </Router>
        </BrowserRouter>

    )
}