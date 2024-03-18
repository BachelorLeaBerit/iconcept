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

    const handleDeleteUser = async (Id) => {
        try {
            await axios.delete(`/api/profile/${Id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Reset the user profile
            //setUserProfile(null);
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center">Loading...</div>; {/* Apply Bootstrap classes for centering */}
    }

    if (!userProfile) {
        return <div className="d-flex justify-content-center">Error: Unable to fetch user profile data</div>; {/* Apply Bootstrap classes for centering */}
    }

    return (
        <div className="d-flex justify-content-center"> {/* Apply Bootstrap classes for centering */}
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
