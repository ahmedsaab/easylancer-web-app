/*
 *
 * Modal actions
 *
 */

import { UPDATE_MODAL } from 'elements/pages/Modal/constants';

export function updateModal(modalName) {
  return {
    type: UPDATE_MODAL,
    modalName,
  };
}
