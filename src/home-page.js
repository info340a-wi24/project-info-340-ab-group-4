import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

function HomePage({ image, alt, eventName, condensedDescription, eventId }) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="card">
            <img src={image} alt={alt} />
            <div className="card-content">
                <h3>{eventName}</h3>
                <p>{condensedDescription}</p>
                <Link to={`/events/${eventId}`} className="btn" alt={`Link to ${eventName} event page`} onClick={scrollToTop}>Event Details</Link>
            </div>
        </div>
    );
}

export default HomePage;
