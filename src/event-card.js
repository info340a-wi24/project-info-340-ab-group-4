import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EventCard({ eventName, venue, startDate, endDate, address, description, link, image, alt, reviewOne, reviewTwo }) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000); // delay by 1 second
    }

    return (
        <main>
        <div className="event-card-container">
            <div className="event-schedule-container">
                <div className="event-card">
                    <div className="img-section">
                        <img src={image} alt={alt} />
                    </div>
                    <div className="name-theater-section">
                        <h2>{eventName}</h2>
                        <h3>{venue}</h3>
                        <h4>{address}</h4>
                    </div>
                </div>
                <div className="schedule">
                    {/* FOR NEXT DRAFT: create schedule array so unique schedules are on display for each event */}
                    <h2>Dates & Times</h2>
                    <h3>{startDate} to {endDate}</h3>
                    <div className="date-time">
                        <h4>Jan 3</h4>
                        <ul>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'Low Tix!'}</Link></li>
                            <li>7:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'SOLD OUT'}</Link></li>
                        </ul>
                    </div>
                    <div className="date-time">
                        <h4>Jan 5</h4>
                        <ul>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'Low Tix!'}</Link></li>
                        </ul>
                    </div>
                    <div className="date-time">
                        <h4>Jan 8</h4>
                        <ul>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                        </ul>
                    </div>
                    <div className="date-time">
                        <h4>Jan 9</h4>
                        <ul>
                            <li>7:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'SOLD OUT'}</Link></li>
                            <li>7:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'SOLD OUT'}</Link></li>
                        </ul>
                    </div>
                    <div className="date-time">
                        <h4>Jan 12</h4>
                        <ul>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'Low Tix!'}</Link></li>
                        </ul>
                    </div>
                    <div className="date-time">
                        <h4>Jan 13</h4>
                        <ul>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                        </ul>
                    </div>
                    <div className="date-time">
                        <h4>Jan 16</h4>
                        <ul>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="buy-ticket">{loading ? 'Loading...' : 'Available'}</Link></li>
                            <li>2:00 PM <Link to={link} onClick={handleClick} className="ticket-status">{loading ? 'Loading...' : 'Low Tix!'}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="about-review-container">
                <div className="about-section">
                    <h2>About the Show</h2>
                    <p>{description}</p>
                </div>
                <div className="review-section">
                    <h2>Reviews</h2>
                    <ul>
                        <li><p>{reviewOne}</p></li>
                        <li><p>{reviewTwo}</p></li>
                    </ul>
                </div>
            </div>
        </div>
        </main>
    );
}

export default EventCard;