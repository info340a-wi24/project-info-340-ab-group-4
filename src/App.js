import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import HomePage from './home-page';
import EventCard from './event-card';
import eventsData from './events-data.json';
import EventPage from './event-page';
import Calendar from './calendar';
import Form from './form';
import Profile from './profile';
import SignIn from './sign-in-page';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseConfig } from './Config';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getDatabase();

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

    const handleSignOut = async() => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

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
                <Route path="/events/:eventId" element={<EventPage />} />
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
                                    eventId={index} 
                                    image={event.image}
                                    alt={event.alt}
                                    eventName={event.eventName}
                                    condensedDescription={event.condensedDescription}
                                />
                            ))}
                        </main>
                    </div>

                )} />
                

                {/* <Route path="/submission" element={<Form />} />
                <Route path="/profile" element={<Profile />} /> */}
                {/* protected routes for submission and profile */}
                {/* CALENDAR */}
                <Route path="/calendar" element={currentUser ? <Calendar /> : <Navigate to="/signin"  />} />
                <Route path="/submission" element={currentUser ? <Form /> : <Navigate to="/signin"  />} />
                <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/signin" />} />
                {/* sign in route */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<HomePage events={eventsData} />} />



                {/* HOME PAGE */}
                <Route path="/" element={(
                    <main className="card-container">
                        {firstFourEvents.map((item, index) => (
                            <HomePage
                                key={index}
                                eventId={index} 
                                image={item.image}
                                alt={item.alt}
                                eventName={item.eventName}
                                condensedDescription={item.condensedDescription} />
                        ))}
                    </main>
                )} />
                {/* EVENT CARDS */}
                {eventsData.map((event, index) => (
                    // <Route key={index} path={`/events/${index}`} element={<EventCard event={event} />} />
                    // ))}
                    <Route key={index} path={`/events/${index}`} element={<EventCard {...event} />} />
                ))}
            </Routes>
            <Footer />
        </BrowserRouter>
    );

}

export default App;
