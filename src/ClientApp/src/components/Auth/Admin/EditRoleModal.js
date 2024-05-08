import React, { useState } from "react";
import axios from "axios";

const EditRoleModal = ({ user, closeModal, fetchUsers }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const assignRole = async () => {
    try {
      await axios.post(
        `/api/admin/${user.id}/assign-role`,
        `"${selectedRole}"`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  return (
    <div className="modal" style={{ padding: "10px", borderRadius: "8px" }}>
      <div
        className="modal-content"
        style={{ padding: "20px", width: "400px" }}
      >
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h5 style={{ marginBottom: "20px" }}>
          Endre brukerrolle for{" "}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </h5>
        {["Admin", "Redaktør", "Bruker"].map((role) => (
          <label key={role} style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="radio"
              name="role"
              value={role}
              checked={selectedRole === role}
              onChange={() => setSelectedRole(role)}
            />
            {" " + role}
          </label>
        ))}
        <button className="btn btn-primary" onClick={assignRole}>
          Endre rolle
        </button>
      </div>
    </div>
  );
};

export default EditRoleModal;