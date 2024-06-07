import axios from "axios";

export const addIconToCart = async (payload, token = '') => {
    try {
        const response = await axios.post('/api/cart/add', payload, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to add icon to cart');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to add icon to cart:', error);
        }
    }
};

export const removeIconFromCart = async (payload, token = '') => {
    try {
        const response = await axios.post('/api/cart/remove', payload, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to remove icon from cart');
        }
    } catch (error) {
        if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
            return error.response.data
        } else {
            throw new Error('Failed to remove icon from cart:', error);
        }
    }
};

export const getCartApi = async (token = '') => {
    try {
        const response = await axios.get('/api/cart', {
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
