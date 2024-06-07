import axios from 'axios';

const payment = async (formData, token) => {
  try {
    const response = await axios.post('/api/payment', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to make the payment');
    }
  } catch (error) {
    if(error.response && error.response.status === 401 && error.response.data.redirectTo) {
      return error.response.data
  } else {
      throw new Error('Failed to make the payment', error);
  }
  }
};

export default payment;