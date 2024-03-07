import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const assignRole = async (userId) => {
        try {
            await axios.post(`/api/admin/users/${userId}/assign-role`, `"${selectedRole}"`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchUsers(); // Refresh user list after assigning role
        } catch (error) {
            console.error('Error assigning role:', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Assign Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>
                                    <select onChange={(e) => {
                                        setSelectedUser(user.id);
                                        setSelectedRole(e.target.value);
                                    }}>
                                        <option value="">Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        {/* Add other roles as needed */}
                                    </select>
                                    <button onClick={() => assignRole(user.id)}>Assign Role</button>
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
