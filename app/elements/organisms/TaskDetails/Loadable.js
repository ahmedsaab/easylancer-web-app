/**
 *
 * Asynchronously loads the component for TaskDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('elements/organisms/TaskDetails/index'));
