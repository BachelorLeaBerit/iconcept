import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import LoginMessage from './LoginMessage';
import { AuthContext } from '../AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      startCountdown();
    }
  }, []);

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      window.location.href = '/';
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginresponse = await axios.post('/api/login', formData);

      if (loginresponse.status === 200) {
        login({
          token: loginresponse.data.token,
          role: loginresponse.data.role,
          email: loginresponse.data.email,
          lastName: loginresponse.data.lastName,
          firstName: loginresponse.data.firstName
        });
        setIsLoggedIn(true);
        startCountdown();
        window.location.href = '/profile';
      } else {
        setMessage('Ikke gyldig logg-inn');
      }
    } catch (error) {
      setMessage('Feil e-post eller passord');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="container text-center">
        <h2>Du er allerede logget inn.</h2>
        <p>Du blir omdirigert til hjemmesiden om {countdown} sekunder.</p>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-80 mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-3">Logg inn</h2>
        <LoginForm
          formData={formData}
          handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          handleSubmit={handleSubmit}
        />
        <LoginMessage message={message} />
      </div>
    </div>
  );
}

export default Login;