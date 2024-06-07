import axios from "axios";

export const getUserDetails = async (token = '') => {
    try {
        const response = await axios.get('/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get user details');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to get user details', error);
        }
    }
};