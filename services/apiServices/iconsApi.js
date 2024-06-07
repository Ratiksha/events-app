import axios from 'axios';

export const getIcons = async (page) => {
  try {
    const response = await axios.get(`/api/icons?page=${page}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to get the icons');
    }
  } catch (error) {
    throw new Error('Error: ' + error.message);
  }
};

export const searchIcon = async (searchTerm) => {
  try {
    const response = await axios.get(`/api/icons?searchTerm=${searchTerm}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to get the icons');
    }
  } catch (error) {
    throw new Error('Error: ' + error.message);
  }
};
