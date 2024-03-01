import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  // Handlers for changing state
  const handleNameChange = (event) => setName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleBirthdateChange = (event) => setBirthdate(event.target.value);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Profile Updated', { name, username, email, birthdate });
  };

  return (
    <main>
      <section id="profile-page">
        <h1>Account Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={handleNameChange} /><br />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} /><br />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} /><br />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Birth Date:</label>
            <input type="text" id="birthdate" name="birthdate" value={birthdate} onChange={handleBirthdateChange} /><br />
          </div>
          <div className="form-actions">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
