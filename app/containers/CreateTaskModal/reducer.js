import produce from 'immer';
import {
  UPDATE_TASK_FORM,
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
    country: Object.keys(countries)[0],
    city: countries[Object.keys(countries)[0]].data[0].text,
    imagesUrls: [],
    date: new Date(),
    time: '12:00AM',
    location: null,
  },
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const createTaskModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_TASK_FORM:
        draft.form[action.key] = action.value;
        if (action.key === 'category') {
          draft.form.type = categories[action.value].data[0].text;
        } else if (action.key === 'country') {
          draft.form.city = countries[action.value].data[0].text;
        }
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
