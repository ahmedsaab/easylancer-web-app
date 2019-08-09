import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import history from 'utils/history';

import * as PropTypes from 'prop-types';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import OfferList from 'components/molecules/OfferList';
import {
  OffersEmptyState,
  TaskOffersContainer,
} from 'containers/TaskPage/TaskOffers/components';
import * as emptyPicture from 'images/empty-state.png';
import {
  selectTaskPageOffersData,
  selectTaskPageOffersError,
  selectTaskPageOffersLoading,
  selectTaskPageOffersSelectedId,
  selectTaskPageTaskData,
} from 'containers/TaskPage/selectors';
import { viewOffer } from 'containers/TaskPage/actions';

function TaskOffers({
  task,
  offers,
  loading,
  error,
  onClickOffer,
  selectedOfferId,
  disabled,
}) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;

  let content = (
    <OffersEmptyState
      summary="No offers yet"
      details="Interested workers will start applying to your task soon. Don't go for long!"
      picture={emptyPicture}
    />
  );

  if (offers.length > 0) {
    content = (
      <div>
        <OfferList
          disabled={disabled}
          offers={offers.filter(offer => offer.id === task.acceptedOffer)}
          label="Assigned"
          selectedOfferId={selectedOfferId}
          onClickOffer={onClickOffer}
        />
        <OfferList
          disabled={disabled}
          offers={offers.filter(offer => offer.isNew)}
          label="New"
          selectedOfferId={selectedOfferId}
          onClickOffer={onClickOffer}
        />
        <OfferList
          disabled={disabled}
          offers={offers.filter(
            offer => !offer.isNew && offer.id !== task.acceptedOffer,
          )}
          label="All"
          selectedOfferId={selectedOfferId}
          onClickOffer={onClickOffer}
        />
      </div>
    );
  }

  return <TaskOffersContainer>{content}</TaskOffersContainer>;
}

TaskOffers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  task: PropTypes.object,
  disabled: PropTypes.bool,
  selectedOfferId: PropTypes.string,
  onClickOffer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offers: selectTaskPageOffersData,
  loading: selectTaskPageOffersLoading,
  error: selectTaskPageOffersError,
  task: selectTaskPageTaskData,
  selectedOfferId: selectTaskPageOffersSelectedId,
});

const mapDispatchToProps = dispatch => ({
  onClickOffer: offer => {
    history.push(`${offer.id}`);
    dispatch(viewOffer(offer.id));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskOffers);
