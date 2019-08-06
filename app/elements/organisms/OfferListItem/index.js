import React from 'react';
import * as PropTypes from 'prop-types';
import Avatar from 'elements/molecules/Avatar';
import ButtonListItem from 'elements/atoms/ButtonListItem';
import PriceTag from 'elements/molecules/PriceTag';
import LikesMetric from 'elements/molecules/LikesMetric';
import {
  MiddleContainer,
  PriceTagContainer,
  WorkerRating,
} from 'elements/organisms/OfferListItem/components';

function OfferListItem({ offer, isSelected, onClick, disabled }) {
  return (
    <ButtonListItem disabled={disabled} selected={isSelected} onClick={onClick}>
      <div className="d-flex">
        <div className="flex-shrink-1">
          <Avatar
            imgStyle={{ width: '80px', border: '2px solid white' }}
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
              <WorkerRating score={7} />
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
  disabled: PropTypes.bool,
  offer: PropTypes.object,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OfferListItem;
