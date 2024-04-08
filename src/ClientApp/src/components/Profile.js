import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                //console.log('User profile:', response.data);
                const { email, role, id } = response.data; // Destructure email and role from response.data
                localStorage.setItem('role', role); // Store user's role in localStorage
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('email', email);
                console.log('Logged in as:', email, role, id); // L
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
                // Handle error
            }
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center">Laster inn...</div>;
    }

    if (!userProfile) {
        return <div className="d-flex justify-content-center">Error: Unable to fetch user profile data</div>;
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
