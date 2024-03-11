import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';


function HomePage({ events }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });

    };

    return (
        <div className="carousel-container">
            <h1>Welcome to Seattle Curtain Call!</h1>
            <h2>Featured Events</h2>
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} useKeyboardArrows className="presentation-mode">
                {events.map((event, index) => (
                    <div key={index} className="carousel-slide">
                        <div className="carousel-image">
                            <img src={event.image} alt={event.alt} />
                        </div>
                        <div className="carousel-legend">
                            <h3>{event.eventName}</h3>
                            <p>{event.condensedDescription}</p>
                            <Link to={`/events/${event.eventId}`} className="btn" onClick={scrollToTop}>Event Details</Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default HomePage;