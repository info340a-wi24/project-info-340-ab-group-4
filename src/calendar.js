import React, { useState } from 'react'; 
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {

    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedSize, setSelectedSize] = useState('all');
    const [selectedCost, setSelectedCost] = useState('all');
    

    const genres = [
        { label: 'All Genres', value: 'all' },
        { label: 'Plays', value: 'plays' },
        { label: 'Musicals', value: 'musicals' },
        { label: 'Dance', value: 'dance' },
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

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleCostChange = (event) => {
        setSelectedCost(event.target.value);
    };

    const events = [
        { title: 'As You Like It', start: '2024-02-01', genre: 'plays', size: 'medium', cost: 'high'},
        { title: 'Sweeney Todd', start: '2024-02-03', genre: 'musicals', size: 'large', cost: 'low'},
        { title: 'Coppelia', start: '2024-02-07', genre: 'dance', size: 'small', cost: 'medium'}
        // Add more events with categories
    ];

    const filteredEvents = selectedGenre === 'all' && selectedSize === 'all' && selectedCost === 'all'
    ? events
    : events.filter(event => (
        (selectedGenre === 'all' || event.genre === selectedGenre) &&
        (selectedSize === 'all' || event.size === selectedSize) &&
        (selectedCost === 'all' || event.cost === selectedCost)
    ));

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px' }}>
                <select value={selectedGenre} onChange={handleGenreChange} style={{marginRight: '10px'}}>
                    {genres.map(genre => (
                    <option key={genre.value} value={genre.value}>{genre.label}</option>
                    ))}
                </select>
                <select value={selectedSize} onChange={handleSizeChange} style={{marginRight: '10px'}}>
                    {sizes.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                    ))}
                </select>
                <select value={selectedCost} onChange={handleCostChange} style={{marginRight: '10px'}}>
                    {costs.map(cost => (
                    <option key={cost.value} value={cost.value}>{cost.label}</option>
                    ))}
                </select>
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
            events={filteredEvents}
            eventColor='#CFB034'
          />
        </div>
    );
}

export default Calendar;