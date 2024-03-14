import React, { useState } from 'react';
import axios from 'axios';

const EditUserRoleModal = ({ user, closeModal, fetchUsers }) => {
    const [selectedRole, setSelectedRole] = useState('');

    const assignRole = async () => {
        try {
            await axios.post(`/api/admin/${user.id}/assign-role`, `"${selectedRole}"`, {
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

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2> Rediger brukerrolle for {user.firstName} {user.lastName}</h2>
                <select className="form-select" onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="">Velg Rolle</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Redaktør</option>
                </select>
                <button className="btn btn-primary" onClick={assignRole}>Legg til rolle</button>
            </div>
        </div>
    );
};



export default EditUserRoleModal;
