import React, { useState, useEffect } from 'react'; 
import Select from 'react-select';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { firebaseConfig } from './Config';
import { initializeApp } from 'firebase/app';

// Styling for dropdown menus from Select elements
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#B6433E', 
        color: 'white', 
        border: '1px solid black', 
        cursor: 'pointer',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#CFB034' : '#B6433E', 
        color: state.isSelected ? 'black' : 'white', 
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#CFB034',
            color: 'black'
        },
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: 'white', 
    }),
};

function Calendar() {

    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedCost, setSelectedCost] = useState('all');
    const [events, setEvents] = useState([]);
    const [genrePlaceholder, setGenrePlaceholder] = useState('Select Genre');
    const [sizePlaceholder, setSizePlaceholder] = useState('Select Audience Size');
    const [costPlaceholder, setCostPlaceholder] = useState('Select Pricepoint');

    useEffect(() => {
        // Initialize Firebase app
        const firebaseApp = initializeApp(firebaseConfig);
        const database = getDatabase(firebaseApp);
        const eventsRef = ref(database, 'events');
        // Listen for changes to events data
        const handleData = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert data from database into an array
                const eventsArray = Object.keys(data).map(key => ({
                    id: key, 
                    ...data[key]
                }));
                // Set events variable as array from database
                setEvents(eventsArray);
            }
        };
        // Subscribe to events data
        onValue(eventsRef, handleData);
        // Unsubscribe from events data when component unmounts
        return () => {
            off(eventsRef, 'value', handleData);
        };
    }, []);

    const handleEventClick = (info) => {
        const eventLink = info.event.extendedProps.organizerLink;
        // Navigate to the event details page
        window.open(eventLink, '_blank');
    };
    
    // Array of genres
    const genres = [
        { label: 'All Genres', value: 'all' },
        { label: 'Play', value: 'Play' },
        { label: 'Musical', value: 'Musical' },
        { label: 'Cabaret', value: 'Cabaret' },
        { label: 'Concert', value: 'Concert' },
        { label: 'Dance', value: 'Dance' },
        { label: 'Other', value: 'Other' },
    ];

    // Array of audience sizes
    const sizes = [
        { label: 'All Audience Sizes', value: 'all' },
        { label: '0-50', value: '0-50' },
        { label: '50-200', value: '50-200' },
        { label: '200+', value: '200+' },
    ];

    // Array of pricepoints
    const costs = [
        { label: 'All Pricepoints', value: 'all' },
        { label: '$', value: '$' },
        { label: '$$', value: '$$' },
        { label: '$$$', value: '$$$' },
    ];

    // Changes genre selection
    const handleGenreChange = (selectedOption) => {
        setSelectedGenre(selectedOption.value); 
        setGenrePlaceholder(selectedOption ? selectedOption.label : 'Select Genre');
    };

    // Changes audience size selection
    const handleSizeChange = (selectedOption) => {
        setSelectedSize(selectedOption.value); 
        setSizePlaceholder(selectedOption ? selectedOption.label : 'Select Audience Size');
    };

    // Changes pricepoint selection
    const handleCostChange = (selectedOption) => {
        setSelectedCost(selectedOption.value); 
        setCostPlaceholder(selectedOption ? selectedOption.label : 'Select Pricepoint');
    };

    // Filters events based on selections
    const filteredEvents = selectedGenre === 'all' && selectedSize === 'all' && selectedCost === 'all'
    ? events
    : events.filter(event => (
        (selectedGenre === 'all' || event.type === selectedGenre) &&
        (selectedSize === 'all' || event.size === selectedSize) &&
        (selectedCost === 'all' || event.cost === selectedCost)
    ));

    const mappedEvents = filteredEvents.map(event => ({
        ...event,
        title: event.eventName // Rename 'eventName' to 'title' so FullCalendar understands
    }));


    return (
        <div className="calPage">
            <div className="dropMenu">
                <Select 
                    value={selectedGenre} 
                    onChange={handleGenreChange} 
                    options={genres}
                    placeholder={genrePlaceholder}
                    styles={customStyles}
                    aria-label="Select Genre"
                />
                <Select 
                    value={selectedSize} 
                    onChange={handleSizeChange} 
                    options={sizes}
                    placeholder={sizePlaceholder}
                    styles={customStyles}
                    aria-label="Select Audience Size"
                />
                <Select 
                    value={selectedCost} 
                    onChange={handleCostChange} 
                    options={costs}
                    placeholder={costPlaceholder}
                    styles={customStyles}
                    aria-label="Select Pricepoint"
                />
            </div> 
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                start: '',
                center: 'title',
                end: 'prev,next',
                }}
                height="90vh"
                events={mappedEvents}
                eventColor='#CFB034'
                eventBorderColor='black'
                eventTextColor='black'
                eventClick={handleEventClick}
            />
        </div>
    );
}

export default Calendar;