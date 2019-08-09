import produce from 'immer';
import { TOGGLE_SIDE_NAV_VIEW } from 'containers/Header/constants';

export const initialState = {
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const SideBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_SIDE_NAV_VIEW:
        draft.isOpen = action.open === undefined ? !draft.isOpen : action.open;
        break;
    }
  });

export default SideBarReducer;
