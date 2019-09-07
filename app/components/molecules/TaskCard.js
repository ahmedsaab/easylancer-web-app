import React from 'react';
import * as PropTypes from 'prop-types';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardText,
  MDBCol,
  MDBRow,
} from 'mdbreact';
import styled from 'styled-components';
import FullName from 'components/molecules/FullName';
import Location from 'components/molecules/Location';

const CardResp = styled(MDBCard)`
  margin: 4px !important;
  cursor: pointer;
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

const CardOwnerName = styled(FullName)`
  font-size: 0.8rem;
  max-width: 80%;
  display: inline-block;
  padding-left: 10px;
  vertical-align: middle;
`;

const TaskLocation = styled(Location)`
  font-size: 0.8rem;
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
  return (
    <CardResp onClick={viewTaskAction}>
      <CardTopLine className="blue-gradient" />
      <MDBCardHeader>
        <TaskLocation location={task.location} />
      </MDBCardHeader>
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
            <CardOwnerName user={task.creatorUser} />
          </MDBCol>
          <MDBCol size="6">
            <div className="float-right">
              <i className="fas fa-credit-card" />
              <CardPrice>€{task.price}</CardPrice>
            </div>
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
