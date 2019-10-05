import React, { memo, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageProfileProp,
} from 'containers/ProfilePage/selectors';
import {
  loadOwnerProfileBadReviews,
  loadOwnerProfileGoodReviews,
  loadProfile,
  loadWorkerProfileBadReviews,
  loadWorkerProfileGoodReviews,
  updateProfileEditModalIsOpen,
} from 'containers/ProfilePage/actions';
import ProfileHeader from 'components/molecules/ProfileHeader';
import { makeSelectGlobalUser } from 'containers/App/selectors';
import EditProfileModal from 'containers/ProfilePage/EditProfileModal';
import WorkerTabs from 'containers/ProfilePage/WorkerTabs';
import CreatorTabs from 'containers/ProfilePage/CreatorTabs';
import history from 'utils/history';
import saga from './saga';
import reducer from './reducer';

const useStyles = makeStyles(theme => ({
  info: {
    backgroundColor: '#fff',
    padding: theme.spacing(2, 2, 3, 2),
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,0.2)',
    outline: 0,
  },
  container: {
    padding: theme.spacing(1, 0.25, 1, 0.25),
    maxWidth: '1000px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export function ProfilePage({
  match,
  loading,
  error,
  profile,
  user,
  isEditProfile,
  onPageLoad,
  onEditProfileButtonClick,
}) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const classes = useStyles();
  const { id, profileType } = match.params;

  useEffect(() => {
    onPageLoad(id);
  }, [id]);

  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
  }

  if (loading || !user || !profile) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  const isOwnProfile = user.id === profile.id;
  const ratingType = profileType === 'owner' ? 'creator' : 'worker';

  return (
    <div>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      {isOwnProfile && isEditProfile ? <EditProfileModal /> : null}
      <Grid className={classes.container} container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className={classes.info}>
            <ProfileHeader
              imgSrc={profile.imageUrl}
              isApproved={profile.approved}
              firstName={profile.firstName}
              lastName={profile.lastName}
              rating={profile.ratings[ratingType]}
              about={profile.about}
              languages={profile.languages}
              createdAt={profile.createdAt}
              tags={profile.tags}
              onEdit={isOwnProfile ? onEditProfileButtonClick : null}
              role={profileType.toUpperCase()}
              onRoleSwitch={event => {
                history.push(
                  `/profile/${id}/${event.target.checked ? 'worker' : 'owner'}`,
                );
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {profileType === 'worker' ? (
            <WorkerTabs isOwnProfile={isOwnProfile} id={id} />
          ) : (
            <CreatorTabs isOwnProfile={isOwnProfile} id={id} />
          )}
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
  user: PropTypes.object,
  profile: PropTypes.object,
  loading: PropTypes.bool,
  isEditProfile: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onPageLoad: PropTypes.func,
  onEditProfileButtonClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isEditProfile: makeSelectProfilePageEditModalProp('isOpenProfile'),
  profile: makeSelectProfilePageProfileProp('data'),
  loading: makeSelectProfilePageProfileProp('loading'),
  error: makeSelectProfilePageProfileProp('error'),
  user: makeSelectGlobalUser(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadProfile(id));
    dispatch(loadWorkerProfileGoodReviews(id));
    dispatch(loadWorkerProfileBadReviews(id));
    dispatch(loadOwnerProfileGoodReviews(id));
    dispatch(loadOwnerProfileBadReviews(id));
  },
  onEditProfileButtonClick: () => {
    dispatch(updateProfileEditModalIsOpen(true));
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
