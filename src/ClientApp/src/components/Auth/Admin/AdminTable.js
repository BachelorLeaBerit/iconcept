import React from "react";

const AdminTable = ({
  users,
  userId,
  loading,
  handleEditUserRole,
  handleDeleteUser,
}) => {
  return (
    <>
      {loading ? (
        <p>Laster inn...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Navn</th>
              <th>E-post</th>
              <th>Rolle</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user) =>
                user.id !== userId && (
                  <tr key={user.id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.roles && user.roles.length > 0
                        ? user.roles.join(", ")
                        : "Ingen rolle"}
                    </td>
                    <td>
                      <button
                        className="btn btnchangeUserRole"
                        onClick={() => handleEditUserRole(user)}
                      >
                        Endre rolle
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btndeleteUser"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Slett bruker
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminTable;
