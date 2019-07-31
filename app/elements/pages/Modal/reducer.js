/*
 *
 * Modal reducer
 *
 */
import produce from 'immer';
import { UPDATE_MODAL } from 'elements/pages/Modal/constants';

export const initialState = {
  type: null,
};

/* eslint-disable default-case, no-param-reassign */
const modalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_MODAL:
        draft.type = action.modalName;
        break;
    }
  });

export default modalReducer;
