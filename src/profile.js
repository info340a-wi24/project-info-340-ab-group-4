import React, { useState } from 'react';
import { signOut, getAuth, updateProfile, updatePassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './Config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Profile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handlers for changing state
  const handleUsernameChange = (event) => setUsername(event.target.value);
  // const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);


  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: username });
      await updatePassword(auth.currentUser, password);
      console.log('Profile Updated', { username, password });
      alert('Changes saved successfully.');

    } catch (error) {
      console.error('Error updating profile:', error);
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
        {/* change so it actually says right username */}
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
      </div>
    </main>
  );
}

export default Profile;
