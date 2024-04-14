import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AdminTable from './AdminTable';
import EditUserRoleModal from './EditRoleModal';
import { checkAuthentication, fetchUsersData } from './AdminService';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true); // Track user authentication status
    const [showModal, setShowModal] = useState(false);
    const userId = localStorage.getItem('id');

    useEffect(() => {
        checkAuthentication(setLoggedIn, setLoading);
        fetchUsersData(userId, setUsers, setLoading);
    }, [userId]);

    const handleEditUserRole = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = async (userIdToDelete) => {
        const confirmed = window.confirm("Er du sikker på at du vil slette denne brukeren?");
        if (confirmed) {
            try {
                await axios.delete(`/api/admin/${userIdToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(users.filter(user => user.id !== userIdToDelete));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Admin</h2>
            <h4>Alle brukere</h4>
            <AdminTable
                users={users}
                userId={userId}
                loading={loading}
                handleEditUserRole={handleEditUserRole}
                handleDeleteUser={handleDeleteUser}
            />
            {showModal && selectedUser && (
                <EditUserRoleModal
                    user={selectedUser}
                    closeModal={() => setShowModal(false)}
                    fetchUsers={() => fetchUsersData(userId, setUsers, setLoading)}
                />
            )}
        </div>
    );
};

export default Admin;
