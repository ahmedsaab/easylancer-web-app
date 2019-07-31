/**
 *
 * Asynchronously loads the component for TaskPage
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import React from 'react';

export default loadable(() => import('elements/pages/TaskPage/index'), {
  fallback: <LoadingIndicator />,
});
