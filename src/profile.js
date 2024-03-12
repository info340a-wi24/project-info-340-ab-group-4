import React, { useState, useEffect } from 'react';
import { signOut, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const saved = getDatabase(app);
function Profile() {
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [savedEvents, setSavedEvents] = useState([]);

  // fetch saved events data from firebase db called saved-events
  useEffect(() => {
    const savedEventsRef = ref(saved, `saved-events/${auth.currentUser.uid}`);
    onValue(savedEventsRef, (snapshot) => {
      const data = snapshot.val();
      if(data) {
        const savedEventsList = Object.values(data);
        setSavedEvents(savedEventsList);
      } else {
        setSavedEvents([]);
      }
    })
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUsername(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  // changing username and password
  const handleUsernameChange = (event) => setUsername(event.target.value);
  // const handlePasswordChange = (event) => setPassword(event.target.value);

  // submitting changes to username and password
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // update username
      await updateProfile(auth.currentUser, { displayName: username });
      // update password
      // if (password) {
      //   await updatePassword(auth.currentUser, password);
      // }
      setUsername('');
      // setPassword('');
      console.log('Profile Updated', { username });
      alert('Changes saved successfully!');
      // reload after updating username so it displays in the welcome message
      window.location.reload();
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
        <h1>Welcome back, {auth.currentUser.displayName}</h1>
        <div className="account-settings">
          <h2>Account Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} /><br />
            </div>
            {/* <div className="form-group">
              <label htmlFor="name">Password:</label>
              <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} /><br />
            </div> */}
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
                <img src={event.image} alt={event.alt} />
                <div className="card-content">
                  <h3>{event.eventName}</h3>
                  <Link to={`/events/${event.eventId}`} className="btn" alt={`Link to ${event.eventName} event page`}>Event Details</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Profile;
