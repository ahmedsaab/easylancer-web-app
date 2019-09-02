import axios from 'axios';
import querystring from 'querystring';
import auth from './auth';

const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

export const sleep = async time =>
  new Promise(resolve => setTimeout(resolve, time));

export const requestFileUpload = async () => {
  try {
    // await sleep(1000);
    const response = await axios.get(process.env.FILES_API_URL, { headers });

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
    // await sleep(1000);
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

export const postTask = async task => {
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/create`,
      task,
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

export const updateTask = async (id, task) => {
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/${id}/edit`,
      task,
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

export const withdrawOffer = async taskId => {
  await sleep(1000);
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/${taskId}/withdraw`,
      null,
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

export const cancelTask = async id => {
  await sleep(2000);
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/${id}/cancel`,
      null,
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
  // await sleep(1000);
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

export const fetchTags = async text => {
  try {
    let tags = [];
    const response = await axios.post(
      'https://api.meaningcloud.com/topics-2.02',
      querystring.stringify({
        key: 'f9f5571e61fd55acd1b9aeaba08f51d2',
        lang: 'en',
        ilang: 'en',
        txt: text,
        tt: 'ec',
        uw: 'y',
        rt: 'y',
        st: 'n',
        of: 'json',
        dm: 's',
        sdg: 'l',
      }),
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      },
    );

    if (response.data.concept_list) {
      tags = tags.concat(
        response.data.concept_list.map(concept => concept.form),
      );
    }
    if (response.data.entity_list) {
      tags = tags.concat(
        response.data.entity_list.map(concept => concept.form),
      );
    }

    return tags;
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
