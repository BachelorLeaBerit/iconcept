import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await axios.post('api/logout');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
