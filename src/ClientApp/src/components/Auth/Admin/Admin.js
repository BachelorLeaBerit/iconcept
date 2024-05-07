import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminTable from "./AdminTable";
import EditUserRoleModal from "./EditRoleModal";
import { checkAuthentication, fetchUsersData } from "./adminService";
import "../../../styles/Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    checkAuthentication(setLoggedIn, setLoading);
    fetchUsersData(userId, setUsers, setLoading);
  }, [userId]);

  const handleEditUserRole = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userIdToDelete) => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil slette denne brukeren?"
    );
    if (confirmed) {
      try {
        await axios.delete(`/api/admin/${userIdToDelete}`, {
        });
        setUsers(users.filter((user) => user.id !== userIdToDelete));
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          console.error("No Response:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };

  if (loggedIn === false || !role || role !== "Admin") {
    return (
      <div className="container text-center">
        <h3>Du har ikke tilgang til denne siden.</h3>
      </div>
    );
  }

  return (
    <div>
      <h2 className="h2admin">Admin</h2>
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
