/*
 *
 * TaskActionButtons reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from 'elements/organisms/TaskActionButtons/constants';

export const initialState = {
  disabled: false,
};

/* eslint-disable default-case, no-param-reassign */
const taskActionButtonsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default taskActionButtonsReducer;
