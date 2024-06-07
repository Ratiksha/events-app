import axios from 'axios';

export const signin = async (formData) => {
  try {
    const response = await axios.post('/api/auth/signin', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to sign in');
    }
  } catch (error) {
    return error.response.data;
  }
};

export const signup = async (formData) => {
  try {
    const response = await axios.post('/api/auth/signup', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to sign up');
    }
  } catch (error) {
    return error.response.data;
  }
};