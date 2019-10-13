/**
 *
 * Asynchronously loads the component for TaskPage
 *
 */

import loadable from 'utils/loadable';
import React from 'react';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';

export default loadable(() => import('containers/TaskPage/index'), {
  fallback: (
    <FitPage>
      <Spinner dimension="50px" />
    </FitPage>
  ),
});
