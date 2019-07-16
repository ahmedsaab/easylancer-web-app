import axios from 'axios';
import auth from './auth';

const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

export const getTask = async id => {
  try {
    const response = await axios.get(
      `${process.env.CLIENT_API_ROOT}/tasks/${id}/view`,
      { headers },
    );

    return response.data;
  } catch (error) {
    // console.error(error)
    if (error.response) {
      throw new Error(
        `The server responded with error code ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(`Failed to read response from Server`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};

export const searchTasks = async filters => {
  try {
    const response = await axios.get(
      `${process.env.CLIENT_API_ROOT}/search/all`,
      { headers },
    );

    return response.data;
  } catch (error) {
    // console.error(error)
    if (error.response) {
      throw new Error(
        `The server responded with error code ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(`Failed to read response from Server`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};
