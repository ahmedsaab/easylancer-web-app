/**
 *
 * Asynchronously loads the component for TaskPage
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import React from 'react';

export default loadable(() => import('containers/TaskPage/index'), {
  fallback: <LoadingIndicator />,
});
