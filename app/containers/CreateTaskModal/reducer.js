import produce from 'immer';
import {
  UPDATE_TASK_FORM_GENERAL,
  UPDATE_TASK_FORM_COUNTRY,
  UPDATE_TASK_FORM_LOCATION,
  UPDATE_TASK_FORM_REMOVE_TAG,
  UPDATE_TASK_FORM_PUSH_TAG,
  SEND_TASK_SUCCESS,
  SEND_TASK_FAIL,
  SEND_TASK,
  UPDATE_STEP,
  UPDATE_IS_OPEN,
} from './constants';

export const initialState = {
  form: {
    price: null,
    currency: '',
    paymentMethod: null,
    title: '',
    description: '',
    category: null,
    type: null,
    images: [],
    tags: [],
    startDateTime: null,
    startDateTimeError: null,
    country: null,
    address: '',
    location: {
      city: null,
      geo: null,
    },
  },
  loading: false,
  error: null,
  step: 0,
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const createTaskModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_TASK_FORM_GENERAL:
        draft.form[action.key] = action.value;
        if (action.key === 'category') {
          draft.form.type = null;
        }
        break;
      case UPDATE_TASK_FORM_COUNTRY:
        draft.form.location = initialState.form.location;
        draft.form.address = initialState.form.address;
        draft.form.country = action.country;
        break;
      case UPDATE_TASK_FORM_LOCATION:
        draft.form.address = action.address;
        draft.form.location = action.location || initialState.form.location;
        break;
      case UPDATE_TASK_FORM_REMOVE_TAG:
        draft.form.tags = draft.form.tags
          .slice(0, action.index)
          .concat(
            draft.form.tags.slice(action.index + 1, draft.form.tags.length),
          );
        break;
      case UPDATE_TASK_FORM_PUSH_TAG:
        draft.form.tags = draft.form.tags.concat([action.tag.toLowerCase()]);
        break;
      case UPDATE_STEP:
        draft.step = action.step;
        break;
      case UPDATE_IS_OPEN:
        if (action.isOpen) {
          draft.isOpen = true;
        } else {
          draft.form = initialState.form;
          draft.loading = initialState.loading;
          draft.error = initialState.error;
          draft.step = initialState.step;
          draft.isOpen = false;
        }
        break;
      case SEND_TASK:
        draft.loading = true;
        break;
      case SEND_TASK_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.form = initialState.form;
        draft.step = initialState.step;
        draft.isOpen = initialState.isOpen;
        break;
      case SEND_TASK_FAIL:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default createTaskModalReducer;
