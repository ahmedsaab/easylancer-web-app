import React from 'react';
import * as PropTypes from 'prop-types';

import {
  MDBBtn,
  MDBCardBody,
  MDBCardHeader,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCol,
  MDBRow,
  MDBView,
} from 'mdbreact';
import {
  CardFooter,
  CardOwnerImg,
  CardOwnerName,
  CardPrice,
  CardResp,
  CardText,
  CardTopLine,
} from 'elements/organisms/TaskCard/components';

function TaskCard({ task, viewTaskAction }) {
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
        length={3}
        showControls
        showIndicators
        interval={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://picsum.photos/280/140"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
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
              Angelina Parsutina
            </CardOwnerName>
          </MDBCol>
          <MDBCol size="6">
            <MDBBtn rounded block outline color="primary" size="sm">
              Offer
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
