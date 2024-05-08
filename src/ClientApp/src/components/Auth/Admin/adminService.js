import axios from "axios";

export const checkAuthentication = (setLoggedIn, setLoading) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    setLoggedIn(false);
    setLoading(false);
  }
};

export const fetchUsersData = async (setUsers, setLoading) => {
  try {
    const fetchUsersresponse = await axios.get("/api/admin", {});
    setUsers(fetchUsersresponse.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching users:", error);
    setUsers([]);
    setLoading(false);
  }
};
