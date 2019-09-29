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
} from 'containers/ProfilePage/selectors';
import {
  loadProfile,
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
import GradeIcon from '@material-ui/icons/Grade';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Badge from '@material-ui/core/Badge';
import reducer from './reducer';
import saga from './saga';

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
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    marginBottom: theme.spacing(-3),
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
}));

export function ProfilePage({
  match,
  loading,
  error,
  profile,
  user,
  isEdit,
  onPageLoad,
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
                {/* <IconButton color="primary"> */}
                {/*  <SettingsIcon /> */}
                {/* </IconButton> */}
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
              likes={profile.likes}
              dislikes={profile.dislikes}
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
                    <Badge
                      className={classes.imagesIcon}
                      badgeContent={
                        profile.imagesUrls.length > 0
                          ? profile.imagesUrls.length
                          : null
                      }
                      color="secondary"
                    >
                      <PhotoLibraryIcon />
                    </Badge>
                  }
                  value="studio"
                />
                <Tab
                  label={
                    <Badge
                      className={classes.imagesIcon}
                      badgeContent={null}
                      color="secondary"
                    >
                      <GradeIcon />
                    </Badge>
                  }
                  value="reviews"
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
              visible={tab === 'reviews'}
            >
              Reviews tab
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
  onEditProfileButtonClick: PropTypes.func,
  isEdit: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isEdit: makeSelectProfilePageEditModalProp('isOpen'),
  profile: makeSelectProfilePageProfileProp('data'),
  loading: makeSelectProfilePageProfileProp('loading'),
  error: makeSelectProfilePageProfileProp('error'),
  user: makeSelectGlobalUser(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadProfile(id));
    // dispatch(loadProfileGoodReviews(id));
    // dispatch(loadProfileBadReviews(id));
    // dispatch(loadProfileOpenTasks(id));
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
