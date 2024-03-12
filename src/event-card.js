import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, push, get, query, orderByChild } from 'firebase/database';


function EventCard({ eventId, eventName, venue, start, endDate, address, description, link, image, alt, imgCite, reviewOne, reviewTwo, currentUser, saved, sessions, performers }) {
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);
    console.log(`Performers in EventCard for ${eventId}:`, performers);

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
            });
    };

    // render each session's times and dates dynamically
    const renderSessions = () => {
        const sessionElements = sessions.map((session, index) => (
            <div className="date-time" key={index}>
                <h4>{session.date}</h4>
                <ul>
                    {session.times.map((time, timeIndex) => (
                        <li key={timeIndex}>
                            {time} <Link to={link} className="buy-ticket" onClick={() => setLoading(true)}>{loading ? 'Loading...' : 'Available'}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        ));
        return sessionElements;
    };

    const renderPerformers = () => {
        if (!performers || performers.length === 0) {
            return <p>No performers listed for this event.</p>;
        }
    
        const performerElements = performers.map((performer, index) => (
            <li key={index}>
                <img src={performer.image} alt={performer.name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                <strong>{performer.name}</strong> - {performer.role}
            </li>
        ));
        return <ul>{performerElements}</ul>;
    };

    return (
        <main>
            <div className="event-card-container">
                <div className="event-schedule-container">
                    <div className="event-card">
                        <div className="img-section">
                            <img src={image} alt={alt} />
                            {imgCite && <cite>{imgCite}</cite>}
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
                        <h2>Dates & Times</h2>
                        <h3>{start} to {endDate}</h3>
                        {renderSessions()}
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
                <div className="performers-section">
                    <h2>Performers</h2>
                    <ul>{renderPerformers()}</ul>
                </div>
            </div>
            
        </main>
    );
}

export default EventCard;
