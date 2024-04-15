import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.post('api/logout');

        localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email'); 
        localStorage.removeItem('id'); 
        window.location.href = '/';

        console.log('User logged out');

    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export default handleLogout;
