import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true); // Track user authentication status
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoggedIn(false);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { email, role, id, firstName, lastName } = response.data; 
                localStorage.setItem('role', role);
                localStorage.setItem('id', id);
                localStorage.setItem('email', email);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                console.log('Response:', response); 


                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchProfile();

    }, []);

    const handleDeleteUser = async (Id) => {
        const confirmed = window.confirm("Are you sure you want to delete your user?");
        if (confirmed) {
            try {
                await axios.delete(`/api/profile/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (!loggedIn) {
        return <h3 className="d-flex justify-content-center">Du må logge inn for å se brukerprofil.</h3>;
    }

    if (loading) {
        return <div className="d-flex justify-content-center">Laster inn...</div>;
    }
    
    return (
        <div className="d-flex justify-content-center">
            <div>
                <h2>Brukerprofil</h2>
                <p><strong>Fornavn: </strong> {userProfile.firstName}</p>
                <p><strong>Etternavn: </strong> {userProfile.lastName}</p>
                <p><strong>E-post: </strong> {userProfile.email}</p>
                <p><strong>Din rolle: </strong> {userProfile.role}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(userProfile.id)}>Slett bruker</button>
            </div>
        </div>
    );
};

export default Profile;
