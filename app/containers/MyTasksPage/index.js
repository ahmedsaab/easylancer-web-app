import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles, useTheme } from '@material-ui/core';
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
import AppBar from '@material-ui/core/AppBar';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FlagIcon from '@material-ui/icons/Flag';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloseIcon from '@material-ui/icons/Close';
import EmptyStateContent from 'components/molecules/EmptyStateContent';
import * as boxImage from 'images/box.png';
import * as thumbImage from 'images/positive-vote.png';
import * as sleepImage from 'images/sleep.png';
import * as lazyImage from 'images/lazy.png';
import * as babyImage from 'images/baby.png';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import { updateTaskModalIsOpen } from 'containers/CreateTaskModal/actions';
import { toggleSideNav } from 'containers/Header/actions';
import { makeSelectMyTasksByList } from './selectors';
import { loadMyTasks } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 'calc(100vh - 60px)',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 1, 0, 1),
  },
  tabs: {
    zIndex: 'unset',
    // position: 'fixed',
  },
  title: {
    padding: theme.spacing(4, 2, 4, 2),
    fontSize: '2.5rem',
    fontWeight: 500,
  },
  emptyState: {
    flexGrow: 1,
  },
  emptyStateButton: {
    margin: theme.spacing(2),
    padding: theme.spacing(1, 2, 1, 2),
  },
  emptyStateButtonIcon: {
    marginRight: theme.spacing(1),
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
  onCreateTaskButtonClick,
  onLoadListPage,
  onPageLoad,
}) {
  useInjectReducer({ key: 'myTasksPage', reducer });
  useInjectSaga({ key: 'myTasksPage', saga });
  useEffect(() => {
    onPageLoad();
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
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
      <Tab
        icon={<AssignmentIcon />}
        label={compact ? null : 'Applied'}
        value="applied"
        key="applied"
      />,
      <Tab
        icon={<ScheduleIcon />}
        label={compact ? null : 'Planned'}
        value="planned"
        key="planned"
      />,
      <Tab
        icon={<FlagIcon />}
        label={compact ? null : 'Finished'}
        value="finished"
        key="finished"
      />,
      <Tab
        icon={<CloseIcon />}
        label={compact ? null : 'Cancelled'}
        value="cancelled"
        key="cancelled"
      />,
    ];
    listGroups = [
      <ListGroup
        key="Applied"
        lists={[appliedNew, appliedHistory]}
        loadListPage={onLoadListPage}
        path="/my-orders/applied"
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="No applied tasks yet"
            details="Start applying now"
            picture={boxImage}
          >
            <Button
              onClick={() => history.push('/search')}
              color="primary"
              className={classes.emptyStateButton}
            >
              <SearchIcon className={classes.emptyStateButtonIcon} />
              Search tasks
            </Button>
          </EmptyStateContent>
        }
      />,
      <ListGroup
        key="Planned"
        lists={[appliedPendingWorker, appliedStarted, appliedScheduled]}
        loadListPage={onLoadListPage}
        path="/my-orders/planned"
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="All clear!"
            details="No planned tasks at the moment"
            picture={sleepImage}
          >
            <Button
              onClick={() => history.push('/search')}
              color="primary"
              className={classes.emptyStateButton}
            >
              <SearchIcon className={classes.emptyStateButtonIcon} />
              Search tasks
            </Button>
          </EmptyStateContent>
        }
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
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="Wow! Zero finished tasks."
            details="Start applying now"
            picture={babyImage}
          >
            <Button
              onClick={() => history.push('/search')}
              color="primary"
              className={classes.emptyStateButton}
            >
              <SearchIcon className={classes.emptyStateButtonIcon} />
              Search tasks
            </Button>
          </EmptyStateContent>
        }
      />,
      <ListGroup
        key="Cancelled"
        lists={[appliedCancelled]}
        loadListPage={onLoadListPage}
        path="/my-orders/cancelled"
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="No cancelled tasks"
            details="Good for you!"
            picture={thumbImage}
          />
        }
      />,
    ];
  } else if (user.settings.role === 'OWNER') {
    tabs = [
      <Tab
        icon={<AssignmentIcon />}
        label={compact ? null : 'Open'}
        value="open"
        key="open"
      />,
      <Tab
        icon={<ScheduleIcon />}
        label={compact ? null : 'Planned'}
        value="planned"
        key="planned"
      />,
      <Tab
        icon={<FlagIcon />}
        label={compact ? null : 'Finished'}
        value="finished"
        key="finished"
      />,
      <Tab
        icon={<CloseIcon />}
        label={compact ? null : 'Cancelled'}
        value="cancelled"
        key="cancelled"
      />,
    ];
    listGroups = [
      <ListGroup
        key="Open"
        lists={[createdOpen]}
        loadListPage={onLoadListPage}
        path="/my-orders/open"
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="No open tasks found"
            details="Need something done?"
            picture={boxImage}
          >
            <Button
              onClick={onCreateTaskButtonClick}
              color="primary"
              className={classes.emptyStateButton}
            >
              Create task
            </Button>
          </EmptyStateContent>
        }
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
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="No finished tasks yet"
            details="Need something done?"
            picture={babyImage}
          >
            <Button
              onClick={onCreateTaskButtonClick}
              color="primary"
              className={classes.emptyStateButton}
            >
              Create task
            </Button>
          </EmptyStateContent>
        }
      />,
      <ListGroup
        key="Cancelled"
        lists={[createdCancelled]}
        loadListPage={onLoadListPage}
        path="/my-orders/cancelled"
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="No cancelled tasks"
            details="Good for you!"
            picture={thumbImage}
          />
        }
      />,
      <ListGroup
        key="Planned"
        lists={[createdPendingOwner, createdStarted, createdScheduled]}
        loadListPage={onLoadListPage}
        path="/my-orders/planned"
        emptyState={
          <EmptyStateContent
            className={classes.emptyState}
            summary="No planned tasks"
            details="Need something done?"
            picture={lazyImage}
          >
            <Button
              onClick={onCreateTaskButtonClick}
              color="primary"
              className={classes.emptyStateButton}
            >
              Create task
            </Button>
          </EmptyStateContent>
        }
      />,
    ];
  }

  return (
    <div className={classes.container}>
      {!compact ? <div className={classes.title}>My Orders</div> : null}
      <AppBar position="static" color="default" className={classes.tabs}>
        <Tabs
          value={activeTab}
          onChange={(event, value) => {
            history.push(value);
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant={compact ? 'fullWidth' : 'default'}
          scrollButtons="auto"
        >
          {tabs}
        </Tabs>
      </AppBar>
      <div className={classes.content}>
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
  onCreateTaskButtonClick: PropTypes.func.isRequired,
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
  onCreateTaskButtonClick: () => {
    dispatch(updateTaskModalIsOpen(true));
    dispatch(toggleSideNav(false));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MyTasksPage);
