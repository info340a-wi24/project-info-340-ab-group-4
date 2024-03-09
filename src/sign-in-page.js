import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignIn() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        navigateTo('/profile');
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [navigateTo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'username') setUsername(value);
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setUsername('');
      setUser(userCredential.user);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const errorDiv = errorMessage === '' ? '' : <Alert color="danger">Error: {errorMessage}</Alert>;

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isReadytoSubmit = !!user || !isValidEmail(email) || password === '';

  return (
    <div className="sign-in-container">
        <div className="sign-in-box">
            <h1>Create an Account or Sign-In</h1>
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  valid={isValidEmail(email)}
                  invalid={!isValidEmail(email)}
                  value={email}
                  onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Label for="username">Username:</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Button color="primary" onClick={handleSignUp} disabled={isReadytoSubmit || username === ''}>
                  Sign Up
                </Button>
                {' '}
                <Button color="success" onClick={handleSignIn} disabled={isReadytoSubmit || username !== ''}>
                  Sign In
                </Button>
                {/* {' '} */}
                {/* <Button color="danger" onClick={handleSignOut} disabled={user === null}>
                  Sign Out
                </Button> */}
            </FormGroup>
            
            {errorDiv}
        </div>

    </div>
  );
}

export default SignIn;
