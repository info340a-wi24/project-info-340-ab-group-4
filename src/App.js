import React from 'react';
import Header from './header';
import Footer from './footer';
import HomePage from './home-page';
import EventCard from './event-card';
import eventsData from './events-data.json';
// import performerData from './performers.json';
import EventPage from './event-page';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Calendar from './calendar';

const Placeholder = () => null;

function App() {
    const firstFourEvents = eventsData.slice(0, 4);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* HEADER */}
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/events/:eventId" element={<EventPage />} />
                {/* EVENTS PAGE */}
                <Route path="/events" element={(
                    <main className="card-container">
                        {eventsData.map((event, index) => (
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
                )} />
                <Route path="/submission" element={<Placeholder />} />
                <Route path="/profile" element={<Placeholder />} />
                {/* search bar */}
                

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
                                // indicate if is first child to make card bigger
                                // isFirstCard={index === 0} />
                        ))}
                    </main>
                )} />
                {/* EVENT CARDS */}
                {eventsData.map((event, index) => (
                    <Route key={index} path={`/events/${index}`} element={<EventCard {...event} />} />
                ))}
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;