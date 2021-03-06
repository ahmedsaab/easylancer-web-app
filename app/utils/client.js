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

export const getWorkerReviews = async (userId, status, page = 1) => {
  try {
    const response = await axios.get(
      `${
        process.env.CLIENT_API_ROOT
      }/profiles/${userId}/worker/reviews?status=${status}&page=${page}`,
      { headers },
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

export const getOwnerReviews = async (userId, status, page = 1) => {
  try {
    const response = await axios.get(
      `${
        process.env.CLIENT_API_ROOT
      }/profiles/${userId}/owner/reviews?status=${status}&page=${page}`,
      { headers },
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

export const getMyTasks = async (type, page = 1) => {
  // await sleep(200000);

  try {
    let path = '';
    switch (type) {
      case 'appliedNew':
        path = 'applied/open';
        break;
      case 'appliedHistory':
        path = 'applied/history';
        break;
      case 'appliedScheduled':
        path = 'assigned/scheduled';
        break;
      case 'appliedStarted':
        path = 'assigned/started';
        break;
      case 'appliedPendingWorker':
        path = 'assigned/pending-worker-review';
        break;
      case 'appliedDone':
        path = 'assigned/done';
        break;
      case 'appliedNotDone':
        path = 'assigned/not-done';
        break;
      case 'appliedInvestigate':
        path = 'assigned/investigate';
        break;
      case 'appliedPendingOwner':
        path = 'assigned/pending-owner-review';
        break;
      case 'appliedCancelled':
        path = 'assigned/cancelled';
        break;
      case 'createdOpen':
        path = 'created/open';
        break;
      case 'createdScheduled':
        path = 'created/scheduled';
        break;
      case 'createdStarted':
        path = 'created/started';
        break;
      case 'createdPendingWorker':
        path = 'created/pending-worker-review';
        break;
      case 'createdDone':
        path = 'created/done';
        break;
      case 'createdNotDone':
        path = 'created/not-done';
        break;
      case 'createdInvestigate':
        path = 'created/investigate';
        break;
      case 'createdPendingOwner':
        path = 'created/pending-owner-review';
        break;
      case 'createdCancelled':
        path = 'created/cancelled';
        break;
      default:
    }

    const response = await axios.get(
      `${process.env.CLIENT_API_ROOT}/my-tasks/${path}?page=${page}`,
      { headers },
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

export const getProfile = async id => {
  try {
    // await sleep(1000);
    const response = await axios.get(
      `${process.env.CLIENT_API_ROOT}/profiles/${id}/view`,
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

export const updateProfile = async (id, profile) => {
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/profiles/${id}/edit`,
      profile,
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

export const getMe = async () => {
  try {
    // await sleep(1000);
    const response = await axios.get(`${process.env.CLIENT_API_ROOT}/me/view`, {
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

export const updateMe = async user => {
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/me/edit`,
      user,
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

export const finishTask = async (id, review, isOwner) => {
  try {
    const urlEnd = isOwner ? 'owner' : 'worker';
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/tasks/${id}/review/${urlEnd}`,
      review,
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
  // await sleep(1000);
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
  // await sleep(2000);
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

export const getSettings = async () => {
  // await sleep(1000);
  try {
    const response = await axios.get(
      `${process.env.CLIENT_API_ROOT}/settings/view`,
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

export const saveSettings = async settings => {
  await sleep(1000);
  try {
    const response = await axios.post(
      `${process.env.CLIENT_API_ROOT}/settings/edit`,
      settings,
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

export const loadImages = async urls =>
  Promise.all(
    urls.map((url, i) =>
      fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => ({
          data: new File([buf], `file_${i}.jpeg`, { type: 'image/jpeg' }),
          url,
        })),
    ),
  );
