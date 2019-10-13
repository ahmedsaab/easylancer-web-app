import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';

import SectionLabel from 'components/atoms/SectionLabel';
import OfferListItem from 'containers/TaskPage/TaskOffers/OfferListItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  list: {
    margin: '0 -20px',
    padding: 0,
  },
}));

/**
 * @return {null}
 */
function OfferList({
  offers,
  isAssigned,
  selectedOfferId,
  label,
  disabled,
  onClickOffer,
}) {
  const classes = useStyles();

  const offerComponents = offers.map((offer, index) => (
    <Fragment key={offer.id}>
      {index === 0 ? <Divider variant="fullWidth" component="li" /> : null}
      <OfferListItem
        isAssigned={isAssigned}
        isSelected={offer.id === selectedOfferId}
        onClick={() => onClickOffer(offer)}
        offer={offer}
        disabled={disabled}
      />
      <Divider variant="fullWidth" component="li" />
    </Fragment>
  ));

  if (offerComponents.length === 0) {
    return null;
  }

  return (
    <div>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <List className={classes.list}>{offerComponents}</List>
    </div>
  );
}

OfferList.propTypes = {
  disabled: PropTypes.bool,
  isAssigned: PropTypes.bool,
  offers: PropTypes.array,
  label: PropTypes.string,
  onClickOffer: PropTypes.func,
  selectedOfferId: PropTypes.string,
};

export default OfferList;
