import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
        <Carousel autoPlay infiniteLoop showThumbs={false}>
            {events.map((event, index) => (
                <div key={index} className="card">
                    <img src={event.image} alt={event.alt} />
                    <div className="legend">
                        <h3>{event.eventName}</h3>
                        <p>{event.condensedDescription}</p>
                        <Link to={`/events/${event.eventId}`} className="btn" onClick={scrollToTop}>Event Details</Link>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

export default HomePage;