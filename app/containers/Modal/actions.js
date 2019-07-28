/*
 *
 * Modal actions
 *
 */

import { UPDATE_MODAL } from 'containers/Modal/constants';

export function updateModal(modalName) {
  return {
    type: UPDATE_MODAL,
    modalName,
  };
}
