import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('User profile:', response.data);
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userProfile) {
        return <div>Error: Unable to fetch user profile data</div>;
    }

    return (
        <div>
            <h2>Brukerprofil</h2>
            <p><strong>Fornavn</strong> {userProfile.firstName}</p>
            <p><strong>Etternavn</strong> {userProfile.lastName}</p>
            <p><strong>Epost</strong> {userProfile.email}</p>
            <p>Roller {userProfile.role}</p>
        </div>
    );
};

export default Profile;
