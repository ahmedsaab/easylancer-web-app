/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/molecules/LoadingIndicator';

export default loadable(() => import('containers/NotFoundPage/index'), {
  fallback: <LoadingIndicator />,
});
