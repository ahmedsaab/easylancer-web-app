import React from 'react';
import * as PropTypes from 'prop-types';
import Avatar from 'elements/molecules/Avatar';
import PriceTag from 'elements/molecules/PriceTag';
import { MDBIcon } from 'mdbreact';
import LikesMetric from 'elements/molecules/LikesMetric';
import {
  MiddleContainer,
  PriceTagContainer,
  RatingsContainer,
} from 'elements/organisms/AssignedOfferListItem/components';

function AssignedOfferListItem({ offer, onClick }) {
  return (
    <div
      style={{
        padding: '15px',
        borderRadius: '7px',
        border: '2px solid rgba(228, 222, 153, 0.54)',
        backgroundColor: 'rgba(245, 243, 220, 0.54)',
      }}
      onClick={onClick}
    >
      <div className="d-flex">
        <div className="flex-shrink-1">
          <Avatar
            imgStyle={{
              width: '80px',
              border: '2px solid rgba(228, 222, 153, 0.54)',
            }}
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
    </div>
  );
}

AssignedOfferListItem.propTypes = {
  disabled: PropTypes.bool,
  offer: PropTypes.object,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AssignedOfferListItem;
