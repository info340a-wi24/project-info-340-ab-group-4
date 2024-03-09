import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { push, ref } from 'firebase/database'; 
// import eventsData from './events-data.json';

function EventCard({ eventId, eventName, venue, start, endDate, address, description, link, image, alt, reviewOne, reviewTwo, currentUser, saved }) {
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);

    // // generate eventId
    // const generateEventId = () => {
    //     return Math.random().toString(36).substr(2, 9);
    // }

    // saves event to firebase
    const saveEvent = () => {
        if (currentUser) {
            const eventItem = {
                // eventId: generateEventId(),
                eventId, eventName, venue, start, endDate, address, description, link, image, alt, reviewOne, reviewTwo
            };
            push(ref(saved, `saved-events/${currentUser.uid}`), eventItem)
                .then(() => {
                    console.log('event saved');
                    // setSave(true);
                })
                .catch((error) => console.log('error saving event: ', error));
        }
    };

    // const handleSaveClick = () => {
    //     setLoading(true);
    //     saveEvent();
    // }

    const handleClick = () => {
        setLoading(true);
        // check if event is already saved
        const isEventAlreadySaved = saved.some((savedEvent) => savedEvent.eventId === eventId);
        if (isEventAlreadySaved) {
            alert('Event is already saved.');
            setLoading(false);
        } else {
            setTimeout(() => {
                setLoading(false);
                setSave(true);
                saveEvent();
            }, 1000);
        }
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