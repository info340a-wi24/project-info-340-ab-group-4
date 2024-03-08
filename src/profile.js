import React, { useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './Config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers for changing state
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);


  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Profile Updated', { username, email, password });
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
      <section id="profile-page">
        <h1>Account Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} /><br />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} /><br />
          </div>
          <div className="form-group">
            <label htmlFor="name">Password:</label>
            <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} /><br />
          </div>
          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleSignOut}>Sign Out</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
