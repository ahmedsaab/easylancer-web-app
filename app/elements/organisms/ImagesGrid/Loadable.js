/**
 *
 * Asynchronously loads the component for ImagesGrid
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('elements/organisms/ImagesGrid/index'));
