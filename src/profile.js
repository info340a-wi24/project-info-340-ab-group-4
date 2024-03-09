import React, { useState, useEffect } from 'react';
import { signOut, getAuth, updateProfile, updatePassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
// import eventsData from './events-data.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const saved = getDatabase(app);
// {eventId}
function Profile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savedEvents, setSavedEvents] = useState([]);

  // fetch saved events data from firebase db called saved-events
  useEffect(() => {
    const savedEventsRef = ref(saved, `saved-events/${auth.currentUser.uid}`);
    onValue(savedEventsRef, (snapshot) => {
      const data = snapshot.val();
      if(data) {
        const savedEventsList = Object.values(data);
        // const savedEventsList = Object.entries(data).map(([eventId, eventData]) => ({
        //   eventId, // Include eventId in the event data
        //   ...eventData,
        // }));
        setSavedEvents(savedEventsList);
      } else {
        setSavedEvents([]);
      }
    })
  }, []);

  // changing username and password
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);

  // submitting changes to username and password
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: username });
      await updatePassword(auth.currentUser, password);
      console.log('Profile Updated', { username, password });
      alert('Changes saved successfully!');

    } catch (error) {
      console.error('Error updating profile: ', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  // sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <main>
      <div className="profile-container">
        {/* TO DO: Change so it actually says right username */}
        <h1>Welcome back, {username || 'User'}</h1>
        <div className="account-settings">
          <h2>Account Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} /><br />
            </div>
            {/* <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} /><br />
            </div> */}
            <div className="form-group">
              <label htmlFor="name">Password:</label>
              <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} /><br />
            </div>
            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleSignOut}>Sign Out</button>
            </div>
          </form>
        </div>

        {/* renders saved events list */}
        <div className="saved-events">
          <h2>Saved Events</h2>
          <ul className="event-list">
            {savedEvents.map((event, index) => (
              <li key={index} className="profile-page-card">
                {/* <div className="event-page-card"> */}
                <img src={event.image} alt={event.alt} />
                <div className="card-content">
                  <h3>{event.eventName}</h3>
                  {/* <p>{event.condensedDescription}</p> */}
                  <Link to={`/events/${event.eventId}`} className="btn" alt={`Link to ${event.eventName} event page`}>Event Details</Link>
                </div>
                {/* </div> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Profile;
