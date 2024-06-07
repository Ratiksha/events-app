import axios from 'axios';

export const getPaymentHistory = async (token = '') => {
    try {
        const response = await axios.get('/api/paymentHistory', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get icons from cart');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to get icons from cart:', error);
        }
    }
};

export const updateDownloadStatus = async (payload, token = '') => {
    try {
        const response = await axios.post('/api/paymentHistory/updateDownloadStatus', payload, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get icons from cart');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to get icons from cart:', error);
        }
    }
};

export const getIcons = async (payload, token = '') => {
    try {
        const response = await axios.post('/api/paymentHistory/getIcons', payload, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to get icons from cart');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to get icons from cart:', error);
        }
    }
};

