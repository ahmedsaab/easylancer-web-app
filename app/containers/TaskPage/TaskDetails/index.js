import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';

import LightBoxImagesGrid from 'components/organisms/LightBoxImagesGrid';
import SectionHeader from 'components/molecules/SectionHeader';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { createStructuredSelector } from 'reselect';
import { selectTaskPageTaskData } from 'containers/TaskPage/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TaskAssignee from 'containers/TaskPage/TaskAssignee';
import Spinner from 'components/atoms/Spinner';
import CenteredDiv from 'components/atoms/CenteredDiv';
import DescriptionIcon from '@material-ui/icons/Description';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { formatTaskStartDateTime } from 'utils/date-time-helpers';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: 'auto',
  },
  icon: {
    color: '#2BBBAD',
    marginRight: theme.spacing(1),
  },
  hideInDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  section: {
    margin: '0',
  },
}));

function TaskDetails({ task, google }) {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <TaskAssignee />
      </Grid>
      <Grid item xs={12}>
        <SectionHeader>
          <DescriptionIcon className={classes.icon} />
          Description
        </SectionHeader>
        <div className={classes.section}>{task.description}</div>
      </Grid>
      <Grid item xs={12}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid item xs={12}>
        <SectionHeader>
          <ScheduleIcon className={classes.icon} />
          Date & Time
        </SectionHeader>
        <div className={classes.section}>
          {formatTaskStartDateTime(task.startDateTime)}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider orientation="horizontal" />
      </Grid>
      {task.imagesUrls.length ? (
        <Fragment>
          <Grid item xs={12}>
            <Fragment>
              <SectionHeader>
                <PhotoLibraryIcon className={classes.icon} />
                Photos
              </SectionHeader>
              <LightBoxImagesGrid
                imageHeight={140}
                className={classes.section}
                images={task.imagesUrls}
              />
            </Fragment>
          </Grid>
          <Grid item xs={12}>
            <Divider orientation="horizontal" />
          </Grid>
        </Fragment>
      ) : null}
      <Grid item xs={12}>
        <SectionHeader>
          <LocationOnIcon className={classes.icon} />
          Location
        </SectionHeader>
        <div className={classes.section}>
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
            <Marker
              position={{
                lat: task.location.geo.lat,
                lng: task.location.geo.lng,
              }}
              name={task.location.address}
            />
          </Map>
        </div>
      </Grid>
    </Grid>
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
  LoadingContainer: () => (
    <CenteredDiv style={{ height: '200px' }}>
      <Spinner dimension="50px" />
    </CenteredDiv>
  ),
})(compose(withConnect)(TaskDetails));
