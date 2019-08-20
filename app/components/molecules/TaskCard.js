import React from 'react';
import * as PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardText,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCol,
  MDBRow,
  MDBView,
} from 'mdbreact';
import styled from 'styled-components';

const CardResp = styled(MDBCard)`
  margin: 4px !important;
  @media screen and (max-width: 552px) {
    .carousel {
      display: none;
    }
    .div-only-mobile {
      display: block;
    }
  }
`;

const CardTopLine = styled('div')`
  height: 5px;
`;

const CardFooter = styled(MDBCardFooter)`
  padding: 0.75rem 0.75rem;
`;

const CardOwnerName = styled('small')`
  max-width: 80%;
  display: inline-block;
  padding-left: 10px;
  vertical-align: middle;
`;

const CardOwnerImg = styled('img')`
  max-width: 20%;
`;

const CardPrice = styled('div')`
  padding-left: 5px;
  font-weight: bold;
  display: inline-block;
`;

const CardText = styled(MDBCardText)`
  cursor: pointer;
  :hover {
    color: #0d47a1 !important;
    text-decoration: underline;
  }
`;

function TaskCard({ task, viewTaskAction }) {
  const CarouselItems = task.imagesUrls.map((url, i) => (
    <MDBCarouselItem itemId={i + 1} key={url}>
      <MDBView>
        <img className="d-block w-100" src={url} alt="" />
      </MDBView>
    </MDBCarouselItem>
  ));

  return (
    <CardResp>
      <CardTopLine className="blue-gradient" />
      <MDBCardHeader>
        <small>Alexandria, Egypt</small>
        <div className="float-right">
          <i className="fas fa-credit-card" />
          <CardPrice>€{task.price}</CardPrice>
        </div>
      </MDBCardHeader>
      <MDBCarousel
        activeItem={1}
        length={CarouselItems.length}
        showControls
        showIndicators
        interval={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>{CarouselItems}</MDBCarouselInner>
      </MDBCarousel>
      <MDBCardBody>
        <CardText onClick={viewTaskAction}>{task.title}</CardText>
      </MDBCardBody>
      <CardFooter>
        <MDBRow>
          <MDBCol size="6" className="align-self-center">
            <CardOwnerImg
              src="https://i.pravatar.cc/25"
              className="img-fluid z-depth-1 rounded-circle"
              alt=""
            />
            <CardOwnerName className="text-truncate">
              Dummy User
            </CardOwnerName>
          </MDBCol>
          <MDBCol size="6">
            <MDBBtn
              rounded
              block
              outline
              color="primary"
              size="sm"
              onClick={viewTaskAction}
            >
              View
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </CardFooter>
    </CardResp>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object,
  viewTaskAction: PropTypes.func,
};

export default TaskCard;
