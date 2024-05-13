import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    email: localStorage.getItem('email') || '',
    lastName: localStorage.getItem('lastName') || '',
    firstName: localStorage.getItem('firstName') || '',
  });

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    id: '',
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('lastName', userData.lastName);
    localStorage.setItem('firstName', userData.firstName);
  };

  const logout = () => {
    setUser({
      token: '',
      role: '',
      email: '',
      lastName: '',
      firstName: '',
    });
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('lastName');
    localStorage.removeItem('firstName');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const profileResponse = await axios.get('/api/profile');
          setProfile(profileResponse.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
