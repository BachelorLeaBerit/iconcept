import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import '../../../styles/Profile.css';
import axios from 'axios';

const Profile = () => {
  const { profile, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteUser = async (Id) => {
    const confirmed = window.confirm("Er du sikker på at du vil slette brukeren din?");
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

  if (loading) {
    return <div className="d-flex justify-content-center">Laster inn...</div>;
  }

  if (!profile) {
    return <h3 className="d-flex justify-content-center">Du må logge inn for å se brukerprofil.</h3>;
  }

  return (
    <div className="container">
      <div className="profile-container">
        <h3 className="profile-heading"> <i class="bi bi-person-vcard-fill"></i> Brukerprofil </h3>
        {(profile.role.includes('Admin')) && (
        <>
            <Link to="/admin" className="btn btn-link mb-3">
                Klikk her for Admin-side
            </Link>
            <Link to="/approveSuggestions" className="btn btn-link mb-3">
                Klikk her for Redaktør-side
            </Link>
            
        </>
        )}
        {profile.role.includes('Redaktør') && (
          <Link to="/approveSuggestions" className="btn btn-link mb-3"> Klikk her for Redaktør-side </Link>
        )}
        <div className="profile-details">
          <div className="profile-item">
            <strong>Fornavn:</strong>
            <p>{profile.firstName}</p>
          </div>
          <div className="profile-item">
            <strong>Etternavn:</strong>
            <p>{profile.lastName}</p>
          </div>
          <div className="profile-item">
            <strong>E-post:</strong>
            <p>{profile.email}</p>
          </div>
          <div className="profile-item">
            <strong>Din tilgangsrolle:</strong>
            <p>{profile.role}</p>
          </div>
        </div>
        <button className="btn btn-danger delete-btn" onClick={handleDeleteUser}>Slett bruker</button>
      </div>
    </div>
  );
};

export default Profile;
