import produce from 'immer';
import { TOGGLE_SIDE_NAV_VIEW } from 'elements/pages/Header/constants';

export const initialState = {
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const SideBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_SIDE_NAV_VIEW:
        handleBodyScroll(draft.isOpen);
        draft.isOpen = action.open === undefined ? !draft.isOpen : action.open;
        break;
    }
  });

const handleBodyScroll = isOpen => {
  if (isOpen) {
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  } else {
    document.body.style.overflowY = 'scroll';
    document.body.style.position = 'fixed';
  }
};

export default SideBarReducer;
