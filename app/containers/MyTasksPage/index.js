import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import {
  makeSelectGlobalLocation,
  makeSelectGlobalUser,
} from 'containers/App/selectors';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route } from 'react-router-dom';
import history from 'utils/history';
import Error404 from 'components/atoms/Error404';
import ListGroup from 'containers/MyTasksPage/ListGroup';
import { makeSelectMyTasksByList } from './selectors';
import { loadMyTasks } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 1, 0, 1),
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabs: {
    flexGrow: 1,
  },
}));

export function MyTasksPage({
  user,
  location,
  appliedNew,
  appliedHistory,
  appliedScheduled,
  appliedStarted,
  appliedPendingWorker,
  appliedDone,
  appliedNotDone,
  appliedInvestigate,
  appliedPendingOwner,
  appliedCancelled,
  createdOpen,
  createdScheduled,
  createdStarted,
  createdPendingOwner,
  createdDone,
  createdNotDone,
  createdInvestigate,
  createdPendingWorker,
  createdCancelled,
  onLoadListPage,
  onPageLoad,
}) {
  useInjectReducer({ key: 'myTasksPage', reducer });
  useInjectSaga({ key: 'myTasksPage', saga });
  useEffect(() => {
    onPageLoad();
  }, []);
  const classes = useStyles();
  const activeTab = location.pathname.split('/').pop();

  let listGroups = null;
  let tabs = null;

  if (!user) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  if (
    !activeTab ||
    (activeTab === 'open' && user.settings.role === 'WORKER') ||
    (activeTab === 'applied' && user.settings.role === 'OWNER')
  ) {
    history.push(user.settings.role === 'WORKER' ? 'applied' : 'open');
  }

  if (user.settings.role === 'WORKER') {
    tabs = [
      <Tab label="Applied" value="applied" key="applied" />,
      <Tab label="Planned" value="planned" key="planned" />,
      <Tab label="Finished" value="finished" key="finished" />,
      <Tab label="Cancelled" value="cancelled" key="cancelled" />,
    ];
    listGroups = [
      <ListGroup
        key="Planned"
        lists={[appliedPendingWorker, appliedStarted, appliedScheduled]}
        loadListPage={onLoadListPage}
        path="/my-orders/planned"
      />,
      <ListGroup
        key="Done"
        lists={[
          appliedInvestigate,
          appliedPendingOwner,
          appliedDone,
          appliedNotDone,
        ]}
        loadListPage={onLoadListPage}
        path="/my-orders/finished"
      />,
      <ListGroup
        key="Cancelled"
        lists={[appliedCancelled]}
        loadListPage={onLoadListPage}
        path="/my-orders/cancelled"
      />,
      <ListGroup
        key="Applied"
        lists={[appliedNew, appliedHistory]}
        loadListPage={onLoadListPage}
        path="/my-orders/applied"
      />,
    ];
  } else if (user.settings.role === 'OWNER') {
    tabs = [
      <Tab label="Open" value="open" key="open" />,
      <Tab label="Planned" value="planned" key="planned" />,
      <Tab label="Finished" value="finished" key="finished" />,
      <Tab label="Cancelled" value="cancelled" key="cancelled" />,
    ];
    listGroups = [
      <ListGroup
        key="Open"
        lists={[createdOpen]}
        loadListPage={onLoadListPage}
        path="/my-orders/open"
      />,
      <ListGroup
        key="Finished"
        lists={[
          createdDone,
          createdNotDone,
          createdInvestigate,
          createdPendingWorker,
        ]}
        loadListPage={onLoadListPage}
        path="/my-orders/finished"
      />,
      <ListGroup
        key="Cancelled"
        lists={[createdCancelled]}
        loadListPage={onLoadListPage}
        path="/my-orders/cancelled"
      />,
      <ListGroup
        key="Planned"
        lists={[createdPendingOwner, createdStarted, createdScheduled]}
        loadListPage={onLoadListPage}
        path="/my-orders/planned"
      />,
    ];
  }

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <Tabs
          value={activeTab}
          onChange={(event, value) => {
            history.push(value);
          }}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          centered
        >
          {tabs}
        </Tabs>
      </div>
      <div>
        <Switch>
          {listGroups}
          <Route path="/my-orders/" component={Error404} />
        </Switch>
      </div>
    </div>
  );
}

MyTasksPage.propTypes = {
  appliedNew: PropTypes.object,
  appliedHistory: PropTypes.object,
  appliedScheduled: PropTypes.object,
  appliedStarted: PropTypes.object,
  appliedPendingWorker: PropTypes.object,
  appliedDone: PropTypes.object,
  appliedNotDone: PropTypes.object,
  appliedInvestigate: PropTypes.object,
  appliedPendingOwner: PropTypes.object,
  appliedCancelled: PropTypes.object,
  createdOpen: PropTypes.object,
  createdScheduled: PropTypes.object,
  createdStarted: PropTypes.object,
  createdPendingOwner: PropTypes.object,
  createdDone: PropTypes.object,
  createdNotDone: PropTypes.object,
  createdInvestigate: PropTypes.object,
  createdPendingWorker: PropTypes.object,
  createdCancelled: PropTypes.object,
  user: PropTypes.object,
  location: PropTypes.object,
  onLoadListPage: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appliedNew: makeSelectMyTasksByList('appliedNew'),
  appliedHistory: makeSelectMyTasksByList('appliedHistory'),
  appliedScheduled: makeSelectMyTasksByList('appliedScheduled'),
  appliedStarted: makeSelectMyTasksByList('appliedStarted'),
  appliedPendingWorker: makeSelectMyTasksByList('appliedPendingWorker'),
  appliedDone: makeSelectMyTasksByList('appliedDone'),
  appliedNotDone: makeSelectMyTasksByList('appliedNotDone'),
  appliedInvestigate: makeSelectMyTasksByList('appliedInvestigate'),
  appliedPendingOwner: makeSelectMyTasksByList('appliedPendingOwner'),
  appliedCancelled: makeSelectMyTasksByList('appliedCancelled'),
  createdOpen: makeSelectMyTasksByList('createdOpen'),
  createdScheduled: makeSelectMyTasksByList('createdScheduled'),
  createdStarted: makeSelectMyTasksByList('createdStarted'),
  createdPendingOwner: makeSelectMyTasksByList('createdPendingOwner'),
  createdDone: makeSelectMyTasksByList('createdDone'),
  createdNotDone: makeSelectMyTasksByList('createdNotDone'),
  createdInvestigate: makeSelectMyTasksByList('createdInvestigate'),
  createdPendingWorker: makeSelectMyTasksByList('createdPendingWorker'),
  createdCancelled: makeSelectMyTasksByList('createdCancelled'),
  user: makeSelectGlobalUser(),
  location: makeSelectGlobalLocation(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => {
    dispatch(loadMyTasks('appliedNew'));
    dispatch(loadMyTasks('appliedHistory'));
    dispatch(loadMyTasks('appliedScheduled'));
    dispatch(loadMyTasks('appliedStarted'));
    dispatch(loadMyTasks('appliedPendingWorker'));
    dispatch(loadMyTasks('appliedDone'));
    dispatch(loadMyTasks('appliedNotDone'));
    dispatch(loadMyTasks('appliedInvestigate'));
    dispatch(loadMyTasks('appliedPendingOwner'));
    dispatch(loadMyTasks('appliedCancelled'));
    dispatch(loadMyTasks('createdOpen'));
    dispatch(loadMyTasks('createdScheduled'));
    dispatch(loadMyTasks('createdStarted'));
    dispatch(loadMyTasks('createdPendingOwner'));
    dispatch(loadMyTasks('createdDone'));
    dispatch(loadMyTasks('createdNotDone'));
    dispatch(loadMyTasks('createdInvestigate'));
    dispatch(loadMyTasks('createdPendingWorker'));
    dispatch(loadMyTasks('createdCancelled'));
  },
  onLoadListPage: (name, page) => {
    dispatch(loadMyTasks(name, page));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MyTasksPage);
