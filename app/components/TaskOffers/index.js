/**
 *
 * TaskOffers
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
// import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import OfferList from 'components/OfferList';

function TaskOffers({ offers, loading, error }) {
  if (loading) return <LoadingIndicator />;
  if (error) return <div>Something bad happened :(</div>;
  return <OfferList offers={offers} label="All" />;
}

TaskOffers.propTypes = {
  offers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

export default TaskOffers;
