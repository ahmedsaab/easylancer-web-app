import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadTask, loadTaskOffers } from 'containers/TaskPage/actions';
import { MDBCol, MDBRow } from 'mdbreact';
import TaskHeader from 'containers/TaskPage/TaskHeader';
import TaskSwitch from 'containers/TaskPage/TaskSwitch';
import FitPage from 'components/atoms/FitPage';
import reducer from 'containers/TaskPage/reducer';
import {
  selectTaskPageTaskData,
  selectTaskPageTaskError,
  selectTaskPageTaskLoading,
} from 'containers/TaskPage/selectors';
import Spinner from 'components/atoms/Spinner';
import OfferModal from 'containers/TaskPage/OfferModal';
import history from 'utils/history';
import saga, { offerUrlRegex } from 'containers/TaskPage/saga';
import TaskActionButtons from 'containers/TaskPage/TaskActionButtons';
import CreateOfferModal from 'containers/TaskPage/CreateOfferModal';
import TaskAssignedModal from 'containers/TaskPage/TaskAssignedModal';
import WithdrawOfferModal from 'containers/TaskPage/WithdrawOfferModal';
import CancelTaskModal from 'containers/TaskPage/CancelTaskModal';
import EditTaskModal from 'containers/TaskPage/EditTaskModal';
import FinishTaskModal from 'containers/TaskPage/FinishTaskModal';
import TaskReview from 'containers/TaskPage/TaskReview';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import TaskOwner from 'containers/TaskPage/TaskOwner';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  data: {
    padding: '20px',
    margin: '0',
    marginBottom: theme.spacing(2),
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,0.2)',
    outline: 0,
  },
  container: {
    padding: theme.spacing(1, 1, 0, 1),
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  widgets: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2),
    },
  },
}));

export function TaskPage({
  match,
  location,
  loading,
  error,
  task,
  onPageLoad,
}) {
  useInjectReducer({ key: 'taskPage', reducer });
  useInjectSaga({ key: 'taskPage', saga });
  const classes = useStyles();

  const ref = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    onPageLoad(id);
  }, [id]);

  if (loading) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
  }

  return (
    <div ref={ref}>
      <Helmet>
        <title>{task.title}</title>
        <meta
          name="description"
          content="This is a page that shows the details of a Task"
        />
      </Helmet>
      <Grid className={classes.container} container spacing={0}>
        <CreateOfferModal />
        <TaskAssignedModal />
        <WithdrawOfferModal />
        <CancelTaskModal />
        <EditTaskModal />
        <FinishTaskModal />
        <Grid item xs={12} md={8}>
          <Paper elevation={0} className={classes.data}>
            <TaskHeader />
            <TaskSwitch />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid className={classes.widgets} container spacing={0}>
            <Grid item xs={12}>
              <TaskActionButtons containerRef={ref} />
            </Grid>
            <Grid item xs={12}>
              <OfferModal
                onClose={() => history.push(`/task/${task.id}/offers/`)}
                isOpen={offerUrlRegex.test(location.pathname)}
              />
            </Grid>
            <Grid item xs={12}>
              <TaskOwner user={task.creatorUser} />
            </Grid>
            <Grid className={classes.widget} item xs={12}>
              <TaskReview />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

TaskPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  task: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  loading: selectTaskPageTaskLoading,
  error: selectTaskPageTaskError,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadTask(id));
    dispatch(loadTaskOffers(id));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskPage);
