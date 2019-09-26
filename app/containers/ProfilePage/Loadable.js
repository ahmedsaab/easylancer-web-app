/**
 *
 * Asynchronously loads the component for ProfilePage
 *
 */

import loadable from 'utils/loadable';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import React from 'react';

export default loadable(() => import('./index'), {
  fallback: (
    <FitPage>
      <Spinner dimension="200px" />
    </FitPage>
  ),
});
