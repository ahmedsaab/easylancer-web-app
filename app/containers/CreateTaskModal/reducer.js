import produce from 'immer';
import {
  UPDATE_TASK_FORM_GENERAL,
  UPDATE_TASK_FORM_COUNTRY,
  UPDATE_TASK_FORM_LOCATION,
  SEND_TASK_SUCCESS,
  SEND_TASK_FAIL,
  SEND_TASK,
  categories,
  countries,
} from './constants';

export const initialState = {
  form: {
    price: 25,
    paymentMethod: 'card',
    title: '',
    description: '',
    category: Object.keys(categories)[0],
    type: categories[Object.keys(categories)[0]].data[0].text,
    imagesUrls: [],
    date: new Date(),
    time: '12:00AM',
    country: null,
    address: '',
    location: {
      city: null,
      geo: null,
    },
  },
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const createTaskModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_TASK_FORM_GENERAL:
        draft.form[action.key] = action.value;
        if (action.key === 'category') {
          draft.form.type = categories[action.value].data[0].text;
        }
        break;
      case UPDATE_TASK_FORM_COUNTRY:
        draft.form.location = initialState.form.location;
        draft.form.address = initialState.form.address;
        draft.form.country = countries.find(c => c.text === action.country);
        break;
      case UPDATE_TASK_FORM_LOCATION:
        draft.form.address = action.address;
        draft.form.location = action.location || initialState.form.location;
        break;
      case SEND_TASK:
        draft.loading = true;
        break;

      case SEND_TASK_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.form = initialState.form;
        break;

      case SEND_TASK_FAIL:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default createTaskModalReducer;
