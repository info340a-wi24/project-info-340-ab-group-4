import React, { useState, useEffect } from 'react'; 
import Select from 'react-select';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import eventsData from './events-data.json';


const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#B6433E', 
        color: 'white', 
        border: '1px solid black', 
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#CFB034' : '#B6433E', 
        color: state.isSelected ? 'black' : 'white', 
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
        setEvents(eventsData);
    }, []);

    const handleEventClick = (info) => {
        const eventLink = info.event.extendedProps.link;
        // Navigate to the event details page
        window.open(eventLink, '_blank');
    };
    
    const genres = [
        { label: 'All Genres', value: 'all' },
        { label: 'Play', value: 'Play' },
        { label: 'Musical', value: 'Musical' },
        { label: 'Cabaret', value: 'Cabaret' },
        { label: 'Concert', value: 'Concert' },
        { label: 'Dance', value: 'Dance' },
        { label: 'Other', value: 'Other' },
    ];

    const sizes = [
        { label: 'All Audience Sizes', value: 'all' },
        { label: '0 - 50', value: 'small' },
        { label: '50 - 200', value: 'medium' },
        { label: '200+', value: 'large' },
    ];

    const costs = [
        { label: 'All Pricepoints', value: 'all' },
        { label: '$', value: 'low' },
        { label: '$$', value: 'medium' },
        { label: '$$$', value: 'high' },
    ];

    const handleGenreChange = (selectedOption) => {
        setSelectedGenre(selectedOption.value); 
        setGenrePlaceholder(selectedOption ? selectedOption.label : 'Select Genre');
    };

    const handleSizeChange = (selectedOption) => {
        setSelectedSize(selectedOption.value); 
        setSizePlaceholder(selectedOption ? selectedOption.label : 'Select Audience Size');
    };

    const handleCostChange = (selectedOption) => {
        setSelectedCost(selectedOption.value); 
        setCostPlaceholder(selectedOption ? selectedOption.label : 'Select Pricepoint');
    };

    const filteredEvents = selectedGenre === 'all' && selectedSize === 'all' && selectedCost === 'all'
    ? events
    : events.filter(event => (
        (selectedGenre === 'all' || event.type === selectedGenre) &&
        (selectedSize === 'all' || event.size === selectedSize) &&
        (selectedCost === 'all' || event.cost === selectedCost)
    ));

    const mappedEvents = filteredEvents.map(event => ({
        ...event,
        title: event.eventName // Rename 'eventName' to 'title'
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
                />
                <Select 
                    value={selectedSize} 
                    onChange={handleSizeChange} 
                    options={sizes}
                    placeholder={sizePlaceholder}
                    styles={customStyles}
                />
                <Select 
                    value={selectedCost} 
                    onChange={handleCostChange} 
                    options={costs}
                    placeholder={costPlaceholder}
                    styles={customStyles}
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