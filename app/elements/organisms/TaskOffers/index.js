/**
 *
 * TaskOffers
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';

import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import OfferList from 'elements/organisms/OfferList';
import { TaskOffersContainer } from 'elements/organisms/TaskOffers/components';

function TaskOffers({ offers, loading, error }) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;
  return (
    <TaskOffersContainer>
      <OfferList offers={offers} label="All" />
    </TaskOffersContainer>
  );
}

TaskOffers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default TaskOffers;
