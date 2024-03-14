import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true); // Track user authentication status
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');

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

    const assignRole = async () => {
        try {
            await axios.post(`/api/admin/${selectedUser.id}/assign-role`, `"${selectedRole}"`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token in headers
                }
            });
            closeModal(); // Close the modal after assigning role
            fetchUsers(); // Refresh user list after assigning role
        } catch (error) {
            console.error('Error assigning role:', error);
            // Handle error
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRole('');
        setSelectedUser(null);
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
                            <th>Roller</th>
                            <th>Rediger Rolle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles && user.roles.length > 0 ? user.roles.join(', ') : 'Ingen roller'}</td>
                                <td>
                                    <button data-toggle="modal" data-target="#modal" className="btn" style={{backgroundColor: '#D0BFFF'}} onClick={() => handleEditUserRole(user)}>Rediger Rolle</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2> Rediger brukerrolle for {selectedUser.firstName} {selectedUser.lastName}</h2>
                        <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Velg Rolle</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Redaktør</option>
                        </select>
                        <button className="btn btn-primary" onClick={assignRole}>Legg til rolle</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
