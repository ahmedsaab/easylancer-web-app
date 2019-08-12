import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

import Avatar from 'components/molecules/Avatar';
import ButtonListItem from 'components/atoms/ButtonListItem';
import PriceTag from 'components/molecules/PriceTag';
import LikesMetric from 'components/molecules/LikesMetric';
import StarRating from 'components/molecules/StarRating';

const PriceTagContainer = styled.div.attrs(() => ({
  className: 'flex-shrink-1',
}))`
  font-size: 1.3rem;
`;

const MiddleContainer = styled.div.attrs(() => ({
  className: 'flex-grow-1',
}))`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 1rem;
`;

const WorkerRating = styled(StarRating)`
  float: left;
  padding-right: 20px;
`;

function OfferListItem({ offer, isSelected, isAssigned, onClick, disabled }) {
  return (
    <ButtonListItem
      assigned={isAssigned}
      disabled={disabled}
      selected={isSelected}
      onClick={onClick}
    >
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
  isAssigned: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OfferListItem;
