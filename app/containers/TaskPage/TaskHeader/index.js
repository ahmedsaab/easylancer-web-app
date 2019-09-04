import React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { MDBCol, MDBRow } from 'mdbreact';
import {
  LocationText,
  PriceTagContainer,
  SeenIcon,
  SeenInfo,
  StatusTime,
  TitleText,
} from 'containers/TaskPage/TaskHeader/components';
import PriceTag from 'components/molecules/PriceTag';
import StatusBadge from 'components/molecules/StatusBadge';
import Tag from 'components/atoms/Tag';
import { selectTaskPageTaskData } from 'containers/TaskPage/selectors';

function TaskHeader({ task }) {
  const tags = task.tags.map(tag => <Tag key={tag}>{tag}</Tag>);

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
          <LocationText location={task.location} />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol size="12" lg="9">
          <TitleText>{task.title}</TitleText>
          <StatusTime>
            {moment
              .utc(task.createdAt)
              .local()
              .format('MMM D, YYYY')}
          </StatusTime>
        </MDBCol>
        <MDBCol size="12" lg="3">
          <PriceTagContainer>
            <PriceTag price={task.price} paymentMethod={task.paymentMethod} />
          </PriceTagContainer>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>{tags}</MDBCol>
      </MDBRow>
    </div>
  );
}

TaskHeader.propTypes = {
  task: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TaskHeader);
