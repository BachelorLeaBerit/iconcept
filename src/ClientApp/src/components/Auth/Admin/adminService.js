import axios from "axios";

export const checkAuthentication = (setLoggedIn, setLoading) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoggedIn(false);
    setLoading(false);
  }
};

export const fetchUsersData = async (userId, setUsers, setLoading) => {
  try {
    const fetchUsersresponse = await axios.get("/api/admin", {
    });
    
    const filteredUsers = fetchUsersresponse.data.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
