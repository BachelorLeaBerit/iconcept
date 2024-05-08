import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.post('api/logout');

        localStorage.clear();
        window.location.href = '/';

    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export default handleLogout;
