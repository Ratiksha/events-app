import axios from "axios";

export const publicIconDownload = async (ids) => {
    try {
        const response = await axios.post('/api/download/public', { ids }, {});
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to download icon');
        }
    } catch (error) {
        throw new Error('Failed to fetch from API: ' + error.message);
    }
};

export const authenticatedIconDownload = async (ids, token = '') => {
    try {
        const response = await axios.post('/api/download/authenticated', { ids }, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to download icon');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to fetch urls', error);
        }
    }
};

