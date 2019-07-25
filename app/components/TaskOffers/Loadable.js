/**
 *
 * Asynchronously loads the component for TaskOffers
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
