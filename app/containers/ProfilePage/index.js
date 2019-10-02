import React, { memo, useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles, useTheme } from '@material-ui/core';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import Grid from '@material-ui/core/Grid';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageProfileProp,
  makeSelectProfilePageReviewsProp,
} from 'containers/ProfilePage/selectors';
import {
  loadProfile,
  loadWorkerProfileBadReviews,
  loadWorkerProfileGoodReviews,
  updateProfileEditModalIsOpen,
} from 'containers/ProfilePage/actions';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from 'containers/ProfilePage/TabPanel';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import ProfileHeader from 'components/molecules/ProfileHeader';
import { StudioTab } from 'containers/ProfilePage/StudioTab';
import { DetailsTab } from 'containers/ProfilePage/DetailsTab';
import Divider from '@material-ui/core/Divider';
import { makeSelectGlobalUser } from 'containers/App/selectors';
import EditProfileModal from 'containers/ProfilePage/EditProfileModal';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PaginatedTaskList from 'components/molecules/PaginatedTaskList';
import * as emptyReviewImage from 'images/customer.png';
import EmptyStateContent from 'components/molecules/EmptyStateContent';
import ProfileTaskReview from 'containers/ProfilePage/ProfileTaskReview';
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
  tabs: {
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,0.2)',
  },
  container: {
    padding: theme.spacing(1, 0.25, 1, 0.25),
    maxWidth: '1000px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabContent: {
    margin: theme.spacing(2, 1),
  },
  extendedHeader: {
    padding: theme.spacing(1, 1, 1, 1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  buttons: {
    marginBottom: theme.spacing(-5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: theme.spacing(1, 2),
    fontSize: '0.8rem',
  },
  editIcon: {
    marginRight: theme.spacing(0.7),
    fontSize: '1rem',
  },
  imagesIcon: {
    margin: theme.spacing(2),
  },
  header: {
    marginTop: theme.spacing(2),
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  tabNumber: {
    paddingLeft: '5px',
    fontSize: '0.7rem',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  emptyState: {
    minHeight: '350px',
  },
  list: {
    padding: theme.spacing(0, 1),
  },
}));

export function ProfilePage({
  match,
  loading,
  error,
  profile,
  goodReviews,
  badReviews,
  user,
  isEdit,
  onPageLoad,
  onLoadMoreGoodReviews,
  onLoadMoreBadReviews,
  onEditProfileButtonClick,
}) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const ref = useRef(null);
  const { id } = match.params;
  const [tab, setTab] = React.useState('details');

  if (!compact && tab === 'details') {
    setTab('studio');
  }

  useEffect(() => {
    onPageLoad(id);
  }, [id]);

  const onChangeTab = (event, newTab) => {
    setTab(newTab);
  };

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

  return (
    <div ref={ref}>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      {isOwnProfile && isEdit ? <EditProfileModal /> : null}
      <Grid className={classes.container} container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className={classes.info}>
            {isOwnProfile ? (
              <div className={classes.buttons}>
                <IconButton color="primary">
                  <SettingsIcon />
                </IconButton>
                <Button
                  flex={2}
                  color="primary"
                  className={classes.editButton}
                  onClick={onEditProfileButtonClick}
                >
                  <EditIcon className={classes.editIcon} />
                  Edit
                </Button>
              </div>
            ) : null}
            <ProfileHeader
              className={classes.header}
              imgSrc={profile.imageUrl}
              isApproved={profile.approved}
              firstName={profile.firstName}
              lastName={profile.lastName}
              rating={profile.ratings}
            />
            {!compact ? (
              <Divider className={classes.divider} orientation="horizontal" />
            ) : null}
            <DetailsTab
              visible={!compact}
              className={classes.extendedHeader}
              tags={profile.tags}
              about={profile.about}
              createdAt={profile.createdAt}
              languages={profile.languages}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} className={classes.tabs}>
            <AppBar position="static" color="default">
              <Tabs
                value={tab}
                onChange={onChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
                scrollButtons="auto"
              >
                {compact ? <Tab icon={<PersonIcon />} value="details" /> : null}
                <Tab
                  label={
                    <div className={classes.tab}>
                      {compact ? <PhotoLibraryIcon /> : <div>Studio</div>}
                      <div className={classes.tabNumber}>
                        {profile.imagesUrls.length > 0
                          ? `(${profile.imagesUrls.length})`
                          : null}
                      </div>
                    </div>
                  }
                  value="studio"
                />
                <Tab
                  label={
                    <div className={classes.tab}>
                      {compact ? <ThumbUpIcon /> : <div>Positive reviews</div>}
                      <div className={classes.tabNumber}>
                        {profile.ratings.worker.likes > 0
                          ? `(${profile.ratings.worker.likes})`
                          : null}
                      </div>
                    </div>
                  }
                  value="good-reviews"
                />
                <Tab
                  label={
                    <div className={classes.tab}>
                      {compact ? (
                        <ThumbDownIcon />
                      ) : (
                        <div>Negative reviews</div>
                      )}
                      <div className={classes.tabNumber}>
                        {profile.dislikes > 0 ? `(${profile.dislikes})` : null}
                      </div>
                    </div>
                  }
                  value="bad-reviews"
                />
              </Tabs>
            </AppBar>
            <TabPanel
              className={classes.tabContent}
              visible={tab === 'details' && compact}
            >
              <DetailsTab
                tags={profile.tags}
                about={profile.about}
                createdAt={profile.createdAt}
                languages={profile.languages}
              />
            </TabPanel>
            <TabPanel className={classes.tabContent} visible={tab === 'studio'}>
              <StudioTab
                imagesUrls={profile.imagesUrls}
                onAddImages={isOwnProfile ? onEditProfileButtonClick : null}
              />
            </TabPanel>
            <TabPanel
              className={classes.tabContent}
              visible={tab === 'good-reviews'}
            >
              <PaginatedTaskList
                className={classes.list}
                error={goodReviews.error}
                loading={goodReviews.loading}
                data={goodReviews.data}
                hasNext={goodReviews.hasNext}
                page={goodReviews.page}
                onLoadPage={page => onLoadMoreGoodReviews(id, page)}
                Task={ProfileTaskReview}
                emptyState={
                  <EmptyStateContent
                    className={classes.emptyState}
                    summary="Nothing done yet"
                    details="Hopefully soon!"
                    picture={emptyReviewImage}
                  />
                }
              />
            </TabPanel>
            <TabPanel
              className={classes.tabContent}
              visible={tab === 'bad-reviews'}
            >
              <PaginatedTaskList
                className={classes.list}
                error={badReviews.error}
                loading={badReviews.loading}
                data={badReviews.data}
                hasNext={badReviews.hasNext}
                page={badReviews.page}
                onLoadPage={page => onLoadMoreBadReviews(id, page)}
                Task={ProfileTaskReview}
                emptyState={
                  <EmptyStateContent
                    className={classes.emptyState}
                    summary="Excellent!"
                    details="No bad reviews"
                    picture={emptyReviewImage}
                  />
                }
              />
            </TabPanel>
          </Paper>
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
  error: PropTypes.instanceOf(Error),
  onPageLoad: PropTypes.func,
  goodReviews: PropTypes.object,
  badReviews: PropTypes.object,
  onLoadMoreGoodReviews: PropTypes.func,
  onLoadMoreBadReviews: PropTypes.func,
  onEditProfileButtonClick: PropTypes.func,
  isEdit: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isEdit: makeSelectProfilePageEditModalProp('isOpen'),
  profile: makeSelectProfilePageProfileProp('data'),
  loading: makeSelectProfilePageProfileProp('loading'),
  error: makeSelectProfilePageProfileProp('error'),
  goodReviews: makeSelectProfilePageReviewsProp('good'),
  badReviews: makeSelectProfilePageReviewsProp('bad'),
  user: makeSelectGlobalUser(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadProfile(id));
    dispatch(loadWorkerProfileGoodReviews(id));
    dispatch(loadWorkerProfileBadReviews(id));
    // dispatch(loadProfileOpenTasks(id));
  },
  onEditProfileButtonClick: () => {
    dispatch(updateProfileEditModalIsOpen(true));
  },
  onLoadMoreGoodReviews(id, page) {
    dispatch(loadWorkerProfileGoodReviews(id, page));
  },
  onLoadMoreBadReviews(id, page) {
    dispatch(loadWorkerProfileBadReviews(id, page));
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
