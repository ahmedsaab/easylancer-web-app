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
  makeSelectMyTasksData,
  makeSelectMyTasksError,
  makeSelectMyTasksLoading,
} from './selectors';
import { loadMyTasks } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectGlobalUser } from 'containers/App/selectors';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1, 1, 0, 1),
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export function MyTasksPage({ loading, error, data, user, onPageLoad }) {
  useInjectReducer({ key: 'myTasksPage', reducer });
  useInjectSaga({ key: 'myTasksPage', saga });
  useEffect(() => {
    onPageLoad();
  }, [user]);

  const classes = useStyles();

  if (loading) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  if (error) {
    return <FitPage>Error :(</FitPage>;
  }

  return (
    <div className={classes.container}>
      {JSON.stringify(data)}
      <div />
      <div />
    </div>
  );
}

MyTasksPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  data: PropTypes.object,
  user: PropTypes.object,
  onPageLoad: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectMyTasksData(),
  loading: makeSelectMyTasksLoading(),
  error: makeSelectMyTasksError(),
  user: makeSelectGlobalUser(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => {
    dispatch(loadMyTasks());
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MyTasksPage);
