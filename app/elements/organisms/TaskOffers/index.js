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
import EmptyStateContent from 'elements/molecules/EmptyStateContent';
import * as emptyPicture from 'images/empty-state.png';

function TaskOffers({ offers, acceptedOfferId, loading, error, disabled }) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;

  let content = (
    <EmptyStateContent
      summary="No offers yet"
      details="Interested workers will start applying to your task soon. Don't go for long!"
      picture={emptyPicture}
      containerStyle={{ height: '600px' }}
    />
  );

  if (offers.length > 0) {
    content = (
      <div>
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
          label="All"
        />
      </div>
    );
  }

  return <TaskOffersContainer>{content}</TaskOffersContainer>;
}

TaskOffers.propTypes = {
  acceptedOfferId: PropTypes.string,
  disabled: PropTypes.bool,
  offers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default TaskOffers;
