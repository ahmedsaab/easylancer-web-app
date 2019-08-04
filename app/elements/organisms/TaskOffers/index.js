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
import ListLabel from 'elements/atoms/ListLabel';

function TaskOffers({ offers, acceptedOfferId, loading, error, disabled }) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;

  return (
    <TaskOffersContainer>
      {acceptedOfferId ? (
        <div>
          <ListLabel>Assigned</ListLabel>
          <AssignedOfferListItem
            offer={offers.find(offer => offer.id === acceptedOfferId)}
          />
        </div>
      ) : null}
      <OfferList
        disabled={disabled}
        offers={offers.filter(offer => offer.isNew)}
        label="New"
      />
      <OfferList
        disabled={disabled}
        offers={offers.filter(
          offer => !offer.isNew && offer.id !== acceptedOfferId,
        )}
        label="Other"
      />
    </TaskOffersContainer>
  );
}

TaskOffers.propTypes = {
  acceptedOfferId: PropTypes.string,
  disabled: PropTypes.bool,
  offers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default TaskOffers;
