import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/Profile.css';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true);
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
                const profileresponse = await axios.get('/api/profile');
                localStorage.setItem('firstName', profileresponse.data.firstName);
                localStorage.setItem('role', profileresponse.data.role);
                localStorage.setItem('email', profileresponse.data.email);
                setUserProfile(profileresponse.data);
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
                });
                localStorage.removeItem('token');
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
    console.log('User Profile:', userProfile);

    
    return (
        <div className="container">
  <div className="profile-container">
    <h3 className="profile-heading"> <i class="bi bi-person-vcard-fill"></i> Brukerprofil </h3>
    {userProfile.role.includes('Admin') && (
      <Link to="/admin" className="btn btn-link mb-3"> Klikk her for ADMIN-side </Link>
    )}
    <div className="profile-details">
      <div className="profile-item">
        <strong>Fornavn:</strong>
        <p>{userProfile.firstName}</p>
      </div>
      <div className="profile-item">
        <strong>Etternavn:</strong>
        <p>{userProfile.lastName}</p>
      </div>
      <div className="profile-item">
        <strong>E-post:</strong>
        <p>{userProfile.email}</p>
      </div>
      <div className="profile-item">
        <strong>Din tilgangsrolle:</strong>
        <p>{userProfile.role}</p>
      </div>
    </div>
    <button className="btn btn-danger delete-btn" onClick={() => handleDeleteUser(userProfile.id)}>Slett bruker</button>
  </div>
</div>

      
    );
};

export default Profile;
