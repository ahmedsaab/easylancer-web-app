import { TOGGLE_SIDE_NAV_VIEW } from 'elements/pages/Header/constants';

export function toggleSideNav(open) {
  return {
    type: TOGGLE_SIDE_NAV_VIEW,
    open,
  };
}
