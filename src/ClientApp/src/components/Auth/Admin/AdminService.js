import axios from 'axios';

export const checkAuthentication = (setLoggedIn, setLoading) => {
    const token = localStorage.getItem('token');
    if (!token) {
        setLoggedIn(false);
        setLoading(false);
        console.log('User not authenticated');
    }
};

export const fetchUsersData = async (userId, setUsers, setLoading) => {
    try {
        const response = await axios.get('/api/admin', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const filteredUsers = response.data.filter(user => user.id !== userId);
        setUsers(filteredUsers);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
