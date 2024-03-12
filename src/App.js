import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import HomePage from './home-page';
import EventCard from './event-card';
import eventsData from './events-data.json';
import EventPage from './event-page';
import EventPageRoute from './event-page-route';
import Calendar from './calendar';
import Form from './form';
import Profile from './profile';
import SignIn from './sign-in-page';
import ErrorPage from './error';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './Config';
import { getDatabase } from 'firebase/database';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const saved = getDatabase(app);

function App() {
    const firstFourEvents = eventsData.slice(0, 4);

    const [search, setSearch] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(eventsData);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    // event listener for search bar
    const handleSearch = () => {
        const newFilteredEvents = eventsData.filter(event =>
            event.eventName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredEvents(newFilteredEvents);
    };
    const handleInput = (event) => {
        setSearch(event.target.value);
    };

    return (
        
        <BrowserRouter>
            <Header />
            <Routes>
                {/* EVENT CARD */}
                <Route path="/events/:eventId" element={<EventPageRoute />} />
                {/* EVENTS PAGE */}
                <Route path="/events" element={(
                    <div>
                        <div className="search-container">
                            <input
                                type="text"
                                className='search-bar'
                                placeholder='Search events...'
                                value={search}
                                onChange={handleInput}
                            />
                            <button className="search-button" onClick={handleSearch}>Search</button>
                        </div>
                        <main className="card-container">
                            {filteredEvents.map((event, index) => (
                                <EventPage
                                    key={index}
                                    eventId={event.eventId} 
                                    image={event.image}
                                    alt={event.alt}
                                    eventName={event.eventName}
                                    condensedDescription={event.condensedDescription}
                                />
                            ))}
                        </main>
                    </div>

                )} />

                {/* protected routes for submission and profile */}
                {/* CALENDAR */}
                <Route path="/calendar" element={currentUser ? <Calendar /> : <Navigate to="/signin"  />} />
                <Route path="/submission" element={currentUser ? <Form /> : <Navigate to="/signin"  />} />
                <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/signin" />} />
                {/* sign in route */}
                <Route path="/signin" element={<SignIn />} />

                {/* HOME PAGE */}
                <Route path="/" element={<HomePage events={eventsData} />} />
                <Route path="/" element={(
                    <main className="card-container">
                        {firstFourEvents.map((item, index) => (
                            <HomePage
                                key={index}
                                eventId={item.eventId} 
                                image={item.image}
                                alt={item.alt}
                                eventName={item.eventName}
                                condensedDescription={item.condensedDescription} />
                        ))}
                    </main>
                )} />

                {/* EVENT CARDS */}
                {eventsData.map((event, index) => (
                    <Route key={index} path={`/events/${event.eventId}`} element={<EventCard {...event} currentUser={currentUser} saved={saved}/>} />
                ))}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );

}

export default App;
