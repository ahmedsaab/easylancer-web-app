/**
 *
 * Asynchronously loads the component for ImagesGrid
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('components/molecules/ImagesGrid/index'));
