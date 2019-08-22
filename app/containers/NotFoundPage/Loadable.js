/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import Spinner from 'components/atoms/Spinner';

export default loadable(() => import('containers/NotFoundPage/index'), {
  fallback: <Spinner />,
});
