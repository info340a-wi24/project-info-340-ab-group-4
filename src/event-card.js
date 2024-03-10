import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, push, get, query, orderByChild } from 'firebase/database';
// import eventsData from './events-data.json';

function EventCard({ eventId, eventName, venue, start, endDate, address, description, link, image, alt, reviewOne, reviewTwo, currentUser, saved }) {
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);

    // saves event to firebase
    const saveEvent = () => {
        if (currentUser) {
            const eventItem = {
                eventId, eventName, venue, start, endDate, address, description, link, image, alt, reviewOne, reviewTwo
            };
            push(ref(saved, `saved-events/${currentUser.uid}`), eventItem)
                .then(() => {
                    console.log('event saved');
                    setSave(true); 
                })
                .catch((error) => console.log('error saving event: ', error))
                .finally(() => setLoading(false));
        }
    };

    const handleClick = () => {
        // is in loading state
        setLoading(true);
        // location in firebase db where user's saved events are stored
        const savedEventsRef = ref(saved, `saved-events/${currentUser.uid}`);
        // retrieves saved events for current user ordered by eventId key
        const savedEventsQuery = query(savedEventsRef, orderByChild('eventId'));
        
        get(savedEventsQuery)
            // snapshot contains data from database
            .then((snapshot) => {
                if (snapshot.exists()) {
                const savedEvents = snapshot.val();
                // check if current event already saved by comparing event id
                // to ones of saved events
                const isEventAlreadySaved = Object.values(savedEvents).some(event => event.eventId === eventId);
                if (isEventAlreadySaved) {
                    alert('Event is already saved.');
                    setLoading(false);
                } else {
                    // adds delay (makes Saving... longer so users can see)
                    setTimeout(() => {
                        saveEvent();
                    }, 1000); 
                }
                } else {
                    setTimeout(() => {
                        saveEvent();
                    }, 1000); 
                }
            })
            .catch((error) => {
                console.error('Error checking saved events: ', error);
                setLoading(false);
            }
        );
    };

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
                    {/* save button only will be rendered for users signed in */}
                    {currentUser && (
                        <button className="save-button" onClick={handleClick} disabled={loading || save}>
                            {loading ? 'Saving...' : save ? 'Saved!' : 'Save'}
                        </button>
                    )}
                </div>
                <div className="schedule">
                    {/* FOR NEXT DRAFT: create schedule array so unique schedules are on display for each event */}
                    <h2>Dates & Times</h2>
                    <h3>{start} to {endDate}</h3>
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