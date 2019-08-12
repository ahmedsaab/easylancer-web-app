import axios from 'axios';
import auth from './auth';

const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

const sleep = async time => new Promise(resolve => setTimeout(resolve, time));

export const getTask = async id => {
  try {
    // await sleep(1000);
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

export const getTaskOffers = async id => {
  try {
    // await sleep(3000);
    const response = await axios.get(
      `${process.env.CLIENT_API_ROOT}/tasks/${id}/offers`,
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

export const getUser = async () => {
  try {
    await sleep(1000);
    const response = await axios.get(`${process.env.CLIENT_API_ROOT}/auth/me`, {
      headers,
    });

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

export const postOffer = async (id, offer) => {
  // await sleep(1000);
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/${id}/apply`,
      offer,
      {
        headers,
      },
    );

    return response.data;
  } catch (error) {
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

export const acceptOffer = async (taskId, offerId) => {
  // await sleep(2000);
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/${taskId}/accept`,
      { id: offerId },
      {
        headers,
      },
    );

    return response.data;
  } catch (error) {
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
  await sleep(1000);
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
