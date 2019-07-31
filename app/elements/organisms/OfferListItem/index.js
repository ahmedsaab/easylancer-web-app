import React from 'react';
import * as PropTypes from 'prop-types';
import Avatar from 'elements/molecules/Avatar';
import ButtonListItem from 'elements/atoms/ButtonListItem';
import PriceTag from 'elements/molecules/PriceTag';
import { MDBIcon } from 'mdbreact';
import LikesMetric from 'elements/molecules/LikesMetric';
import {
  MiddleContainer,
  PriceTagContainer,
  RatingsContainer,
} from 'elements/organisms/OfferListItem/components';
import { withRouter } from 'react-router-dom';

function OfferListItem({ offer, history, location }) {
  return (
    <ButtonListItem
      selected={location.pathname.includes(`offers/${offer.id}`)}
      onClick={() => history.push(`${offer.id}`)}
    >
      <div className="d-flex">
        <div className="flex-shrink-1">
          <Avatar
            imgStyle={{ width: '80px', border: '0' }}
            imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
            isApproved={offer.workerUser.approved}
          />
        </div>
        <MiddleContainer>
          <div>
            <div className="d-flex">
              {offer.workerUser.firstName} {offer.workerUser.lastName}
            </div>
            <div style={{ paddingTop: '5px' }}>
              <RatingsContainer>
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star-half-alt" />
                <MDBIcon far icon="star" />
              </RatingsContainer>
              <LikesMetric
                style={{ float: 'left' }}
                likes={offer.workerUser.likes}
                dislikes={offer.workerUser.dislikes}
              />
            </div>
          </div>
        </MiddleContainer>
        <PriceTagContainer>
          <PriceTag price={offer.price} paymentMethod={offer.paymentMethod} />
        </PriceTagContainer>
      </div>
    </ButtonListItem>
  );
}

OfferListItem.propTypes = {
  offer: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(OfferListItem);
