import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true); // Track user authentication status

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            setLoggedIn(false); // Set loggedIn state to false if token does not exist
            setLoading(false);
            console.log('User not authenticated');
            return;
        }

        // Fetch users if user is authenticated
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token in headers
                }
            });
            console.log('Users:', response.data);
            console.log('Token:', 'hei', localStorage.getItem('token'));
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error
        }
    };

    const assignRole = async (userId) => {
        try {
            await axios.post(`/api/admin/${userId}/assign-role`, `"${selectedRole}"`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token in headers
                }
            });
            fetchUsers(); // Refresh user list after assigning role
        } catch (error) {
            console.error('Error assigning role:', error);
            // Handle error
        }
    };

    if (!loggedIn) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>Admin</h2>
            <h4>Alle brukere</h4>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Epost</th>
                            <th>Roller</th>
                            <th>Legg til rolle</th>
                        </tr>
                    </thead>
                    <tbody>
  {users.map((user) => (
    <tr key={user.id}>
      <td>{user.firstName} {user.lastName}</td>
      <td>{user.userName}</td>
      <td>
        {user.roles && user.roles.length > 0 ? (
          <ul>
            {user.roles.map((role, index) => (
              <li key={index}>{role.name}</li>
            ))}
          </ul>
        ) : (
          <span>No roles</span>
        )}
      </td>
      <td>
        <select className="form-select" onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">Velg Rolle</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Redaktør</option>
        </select>
        <button className="btn btn-primary" onClick={() => assignRole(user.id)}>Legg til rolle</button>
      </td>
    </tr>
  ))}
</tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPanel;
