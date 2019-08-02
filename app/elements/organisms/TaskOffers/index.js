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
import AssignedOfferListItem from 'elements/organisms/AssignedOfferListItem';

function TaskOffers({ offers, loading, error, disabled }) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;

  const assignedOffer = offers.find(offer => offer.isAssigned);

  return (
    <TaskOffersContainer>
      {assignedOffer ? <AssignedOfferListItem offer={assignedOffer} /> : null}
      <OfferList
        disabled={disabled}
        offers={offers.filter(offer => offer.isNew)}
        label="New"
      />
      <OfferList
        disabled={disabled}
        offers={offers.filter(offer => !offer.isNew && !offer.isAssigned)}
        label="Other"
      />
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
