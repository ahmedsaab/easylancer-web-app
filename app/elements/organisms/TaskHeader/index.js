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
  PriceTagContainer,
  SeenIcon,
  SeenInfo,
  StatusTime,
  TitleText,
} from 'elements/organisms/TaskHeader/components';
import PriceTag from 'elements/molecules/PriceTag';
import StatusBadge from 'elements/molecules/StatusBadge';
import Tag from 'elements/atoms/Tag';

function TaskHeader({ task }) {
  return (
    <div>
      <MDBRow>
        <MDBCol size="12">
          <StatusBadge status={task.status} />
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
          <PriceTagContainer>
            <PriceTag price={task.price} paymentMethod={task.paymentMethod} />
          </PriceTagContainer>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <div>
            <Tag>Cleaning</Tag>
            <Tag>Home</Tag>
            <Tag>Floor</Tag>
            <Tag>Windows</Tag>
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
