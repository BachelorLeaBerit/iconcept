import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import EditUserRoleModal from './EditUserRoleModal';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true); // Track user authentication status
    const [showModal, setShowModal] = useState(false);

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
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error
        }
    };

    const handleEditUserRole = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    if (!loggedIn) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Admin</h2>
            <h4>Alle brukere</h4>
            {loading ? (
                <p>Laster inn...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Epost</th>
                            <th>Rolle</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles && user.roles.length > 0 ? user.roles.join(', ') : 'Ingen roller'}</td>
                                <td>
                                    <button className="btn" style={{backgroundColor: '#FF3EA5'}} onClick={() => handleEditUserRole(user)}>Endre Rolle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && selectedUser && (
                <EditUserRoleModal
                    user={selectedUser}
                    closeModal={() => setShowModal(false)}
                    fetchUsers={fetchUsers} // Pass fetchUsers function to update user roles after editing
                />
            )}
        </div>
    );
};

export default AdminPanel;
