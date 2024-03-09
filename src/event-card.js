import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { push, ref } from 'firebase/database'; 

function EventCard({ eventName, venue, startDate, endDate, address, description, link, image, alt, reviewOne, reviewTwo, currentUser, saved }) {
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);

    // saves event to firebase
    const saveEvent = () => {
        if (currentUser) {
            const eventItem = {
                eventName, venue, startDate, endDate, address, description, link, image, alt, reviewOne, reviewTwo
            };
            push(ref(saved, `saved-events/${currentUser.uid}`), eventItem)
                .then(() => console.log('event saved'))
                .catch((error) => console.log('error saving event: ', error));
        }
    };

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSave(true);
            saveEvent();
        }, 1000); // delay redirection by 1 second...
    }

    return (
        <main>
        <div className="event-card-container">
            {/* save button only will be rendered for users signed in */}
            {currentUser && (
                <button onClick={handleClick} disabled={loading || save}>
                    {loading ? 'Saving...' : save ? 'Saved!' : 'Save'}
                </button>
            )}

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