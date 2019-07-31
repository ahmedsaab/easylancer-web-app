/**
 *
 * OfferDetailsModal
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FluidModal from 'elements/molecules/FluidModal';
import OfferDetails from 'elements/organisms/OfferDetails';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
  makeSelectTaskPageId,
  makeSelectTaskPageOffers,
} from 'elements/pages/TaskPage/selectors';
import makeSelectOfferDetailsModal from 'elements/pages/OfferDetailsModal/selectors';
import reducer from 'elements/pages/OfferDetailsModal/reducer';
import saga from 'elements/pages/OfferDetailsModal/saga';

const offerUrlRegex = RegExp(/offers\/[0-9a-f]/i);

export function OfferDetailsModal({ taskId, offers, location }) {
  useInjectReducer({ key: 'offerDetailsModal', reducer });
  useInjectSaga({ key: 'offerDetailsModal', saga });

  let content = <LoadingIndicator />;

  if (offers.error) {
    content = <div>{JSON.stringify(offers.error.message)}</div>;
  }

  if (offers.data && taskId) {
    content = (
      <Switch>
        {offers.data.map(offer => (
          <Route
            key={offer.id}
            exact
            path={`/task/${taskId}/offers/${offer.id}`}
            component={() => <OfferDetails offer={offer} />}
          />
        ))}
      </Switch>
    );
  }

  return (
    <FluidModal
      style={{ padding: '20px' }}
      isOpen={offerUrlRegex.test(location.pathname)}
      onClose={() => alert('close button clicked')}
    >
      {content}
    </FluidModal>
  );
}

OfferDetailsModal.propTypes = {
  taskId: PropTypes.string,
  offers: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  offerDetailsModal: makeSelectOfferDetailsModal(),
  offers: makeSelectTaskPageOffers(),
  taskId: makeSelectTaskPageId(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(OfferDetailsModal));
