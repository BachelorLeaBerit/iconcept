import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.post('api/logout');

        // Clear localStorage
        localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email'); // Assuming user email is stored in localStorage
        localStorage.removeItem('id'); // Assumin
        console.log('User logged out');

    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export default handleLogout;
