/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';

export default loadable(() => import('elements/pages/NotFoundPage/index'), {
  fallback: <LoadingIndicator />,
});
