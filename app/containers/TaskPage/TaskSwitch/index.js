import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs';
import history from 'utils/history';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import TaskDetails from 'containers/TaskPage/TaskDetails';
import TaskOffers from 'containers/TaskPage/TaskOffers';
import {
  selectTaskPageTaskData,
  selectTaskPageOffersData,
} from 'containers/TaskPage/selectors';
import { makeSelectGlobalLocation } from 'containers/App/selectors';
import Badge from '@material-ui/core/Badge';
import Spinner from 'components/atoms/Spinner';
import { getMaxMatchingString } from 'utils/object';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(6),
  },
  tabs: {
    zIndex: 'unset',
    left: 0,
    top: 'unset',
  },
  offersIcon: {
    transform: 'unset',
    position: 'unset',
    marginLeft: '5px',
    minWidth: '18px',
    height: '18px',
  },
}));

function TaskSwitch({ task, offers, disabled, location }) {
  const classes = useStyles();
  const offersBadge =
    // eslint-disable-next-line no-nested-ternary
    !Array.isArray(offers) ? (
      <Spinner dimension="12px" strokeWidth={7} margin="0px" />
    ) : offers.length ? (
      offers.length
    ) : null;

  const tabs = [
    {
      path: `/task/${task.id}`,
      header: 'Details',
      component: () => <TaskDetails />,
      exact: true,
    },
    {
      path: `/task/${task.id}/offers/*`,
      header: offersBadge ? (
        <Badge
          color="primary"
          badgeContent={offersBadge}
          classes={{
            badge: classes.offersIcon,
          }}
        >
          Offers
        </Badge>
      ) : (
        'Offers'
      ),
      component: () => <TaskOffers />,
    },
  ];

  const tabLinks = tabs.map(tab => (
    <Tab label={tab.header} value={tab.path} key={tab.path} />
  ));

  const tabSwitch = tabs.map(tab => (
    <Route key={tab.path} exact path={tab.path} component={tab.component} />
  ));

  const activeTab = getMaxMatchingString(
    tabs.map(tab => tab.path),
    location.pathname,
  );

  return (
    <div className={classes.container}>
      <AppBar
        position="absolute"
        elevation={0}
        color="default"
        className={classes.tabs}
      >
        <Tabs
          value={activeTab}
          onChange={(event, value) => {
            history.push(value);
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
          scrollButtons="auto"
          disabled={disabled}
        >
          {tabLinks}
        </Tabs>
      </AppBar>
      <div className={classes.content}>
        <Switch>{tabSwitch}</Switch>
      </div>
    </div>
  );
}

TaskSwitch.propTypes = {
  disabled: PropTypes.bool,
  task: PropTypes.object,
  offers: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  offers: selectTaskPageOffersData,
  location: makeSelectGlobalLocation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TaskSwitch);
