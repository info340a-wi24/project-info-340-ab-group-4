import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import eventsData from './events-data.json';
import { firebaseConfig } from './Config';


const app = initializeApp(firebaseConfig);
const eventDataDb = getDatabase(app);

// Reference to the 'events' node in the database
const eventsRef = ref(eventDataDb, 'events');

// Push each event from the JSON file to the database
eventsData.forEach((event) => {
  push(eventsRef, event)
    .then(() => {
      console.log('Event added to the database:', event);
    })
    .catch((error) => {
      console.error('Error adding event to the database:', error);
    });
});
