import React, { memo, useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import Grid from '@material-ui/core/Grid';
import { makeSelectProfilePageProfileProp } from 'containers/ProfilePage/selectors';
import { loadProfile } from 'containers/ProfilePage/actions';
import saga from './saga';
import reducer from './reducer';

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

export function ProfilePage({ match, loading, error, profile, onPageLoad }) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
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
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <Grid className={classes.container} container spacing={0}>
        <Grid item xs={12} md={8}>
          {JSON.stringify({ match, loading, error, profile })}
        </Grid>
      </Grid>
    </div>
  );
}

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfilePageProfileProp('data'),
  loading: makeSelectProfilePageProfileProp('loading'),
  error: makeSelectProfilePageProfileProp('error'),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadProfile(id));
    // dispatch(loadProfileGoodReviews(id));
    // dispatch(loadProfileBadReviews(id));
    // dispatch(loadProfileOpenTasks(id));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProfilePage);
