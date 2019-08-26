import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { MDBCol, MDBRow } from 'mdbreact';
import ImagesGrid from 'components/organisms/ImagesGrid';
import { Map, GoogleApiWrapper, Circle } from 'google-maps-react';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import { createStructuredSelector } from 'reselect';
import { selectTaskPageTaskData } from 'containers/TaskPage/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TaskAssignee from 'containers/TaskPage/TaskAssignee';
import ImageGrid from 'components/organisms/ImageGrid';

const PaddedRow = styled(MDBRow)`
  padding: 10px;
`;

const HeaderText = styled('div')`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top 30px;
  border-bottom: 2px solid #4CBBAD;
  margin-bottom: 25px;
`;

function TaskDetails({ task, google }) {
  return (
    <PaddedRow>
      <MDBCol size="12">
        <TaskAssignee />
      </MDBCol>
      <MDBCol size="12" lg="6">
        <HeaderText>Description</HeaderText>
        <div>{task.description}</div>
      </MDBCol>
      <MDBCol size="12" lg="6">
        <HeaderText>Created at</HeaderText>
        <div>{moment(task.createdAt).format('MMM. D, YYYY [at] h:mm A z')}</div>
      </MDBCol>
      <MDBCol size="12">
        {task.imagesUrls.length ? (
          <div>
            <HeaderText>Photos</HeaderText>
            <ImagesGrid images={task.imagesUrls} />
          </div>
        ) : null}
      </MDBCol>
      <MDBCol size="12">
        <HeaderText>Location</HeaderText>
        <Map
          google={google}
          zoom={14}
          containerStyle={{
            position: 'static',
          }}
          style={{
            position: 'relative',
            width: '100%',
            height: '400px',
          }}
          initialCenter={{
            lat: task.location.geo.lat,
            lng: task.location.geo.lng,
          }}
        >
          <Circle
            center={{ lat: task.location.geo.lat, lng: task.location.geo.lng }}
            radius={400}
            strokeColor="#000"
            strokeOpacity={0.1}
            strokeWeight={10}
            fillColor="#4CBBAD"
            fillOpacity={0.3}
            draggable={false}
            visible
          />
        </Map>
      </MDBCol>
    </PaddedRow>
  );
}

TaskDetails.propTypes = {
  task: PropTypes.object,
  google: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
});

const withConnect = connect(mapStateToProps);

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingIndicator,
})(compose(withConnect)(TaskDetails));
