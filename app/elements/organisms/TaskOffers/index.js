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
import { loadTask, loadTaskOffers } from 'elements/pages/TaskPage/actions';

function TaskOffers({ offers, loading, error, disabled }) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;
  return (
    <TaskOffersContainer>
      <OfferList disabled={disabled} offers={offers} label="All" />
    </TaskOffersContainer>
  );
}

TaskOffers.propTypes = {
  disabled: PropTypes.bool,
  offers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default TaskOffers;
