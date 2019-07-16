/**
 *
 * TaskHeader
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

import { MDBCol, MDBRow } from 'mdbreact';
import {
  LocationText,
  PaymentMethod,
  PaymentPrice,
  PaymentPriceNumber,
  PaymentTag,
  SeenIcon,
  SeenInfo,
  StatusBadge,
  StatusTime,
  TaskBadge,
  TitleText,
} from 'components/TaskHeader/components';

function TaskHeader({ task }) {
  return (
    <div>
      <MDBRow>
        <MDBCol size="12">
          <StatusBadge color="success">{task.status}</StatusBadge>
          <SeenInfo>
            <SeenIcon far icon="eye" />
            {task.seenCount}
          </SeenInfo>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="12">
          <LocationText>20251 Hamburg, Germany</LocationText>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="12" lg="9">
          <TitleText>{task.title}</TitleText>
          <StatusTime>
            {moment(task.startDateTime).format('MMM D, YYYY [after] h:mm A z')}
          </StatusTime>
        </MDBCol>
        <MDBCol size="12" lg="3">
          <PaymentTag>
            <PaymentMethod>
              {task.paymentMethod ? <i className="fas fa-credit-card" /> : ''}
            </PaymentMethod>
            <PaymentPrice>
              €<PaymentPriceNumber>{task.price}</PaymentPriceNumber>
            </PaymentPrice>
          </PaymentTag>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <div>
            <TaskBadge>Cleaning</TaskBadge>
            <TaskBadge>Home</TaskBadge>
            <TaskBadge>Floor</TaskBadge>
            <TaskBadge>Windows</TaskBadge>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

TaskHeader.propTypes = {
  task: PropTypes.object,
};

export default TaskHeader;
