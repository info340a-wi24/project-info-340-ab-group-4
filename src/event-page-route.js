import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventPage from './event-page';
import eventsData from './events-data.json';

function EventPageRoute() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // check if eventId exists in eventsData
    const event = eventsData.find(event => event.eventId === eventId);
    // if not, navigate to error page
    if (!event) {
      navigate('/error');
    }
  }, [eventId, navigate]);
  // renders EventPage if eventId exists
  return <EventPage />;
}

export default EventPageRoute;
