import * as PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import EmptyStateContent from 'components/molecules/EmptyStateContent';
import { makeStyles, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { TabPanel } from 'containers/ProfilePage/TabPanel';
import { StudioTab } from 'containers/ProfilePage/StudioTab';
import PaginatedTaskList from 'components/molecules/PaginatedTaskList';
import { WorkerProfileTaskReview } from 'containers/ProfilePage/ProfileTaskReview';
import * as emptyReviewImage from 'images/customer.png';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageProfileProp,
  makeSelectProfilePageWorkerReviews,
} from 'containers/ProfilePage/selectors';
import {
  loadWorkerProfileBadReviews,
  loadWorkerProfileGoodReviews,
  updateProfileEditPhotosModalIsOpen,
} from 'containers/ProfilePage/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import EditPhotosModal from 'containers/ProfilePage/EditPhotosModal';

const useStyles = makeStyles(theme => ({
  tabs: {
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,0.2)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tabContent: {
    flex: 1,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    flexWrap: 'wrap',
  },
  tabNumber: {
    paddingLeft: '5px',
    fontSize: '0.7rem',
  },
  emptyState: {
    height: '100%',
    minHeight: '300px',
  },
  list: {
    padding: theme.spacing(0, 1),
    margin: theme.spacing(2, 1),
  },
  appBar: {
    zIndex: 'unset',
  },
}));

export function WorkerTabs({
  id,
  profile,
  isOwnProfile,
  reviews,
  isEditPhotosModalOpen,
  onEditPhotosButtonClick,
  onLoadMoreGoodReviews,
  onLoadMoreBadReviews,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState('studio');

  const onChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Paper elevation={0} className={classes.tabs}>
      {isOwnProfile && isEditPhotosModalOpen ? <EditPhotosModal /> : null}
      <AppBar className={classes.appBar} position="static" color="default">
        <Tabs
          value={tab}
          onChange={onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
          scrollButtons="auto"
        >
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
                {compact ? <ThumbUpIcon /> : <div>Done</div>}
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
                {compact ? <ThumbDownIcon /> : <div>Unfinished</div>}
                <div className={classes.tabNumber}>
                  {profile.dislikes > 0 ? `(${profile.dislikes})` : null}
                </div>
              </div>
            }
            value="bad-reviews"
          />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabContent} visible={tab === 'studio'}>
        <StudioTab
          imagesUrls={profile.imagesUrls}
          onAddImages={isOwnProfile ? onEditPhotosButtonClick : null}
        />
      </TabPanel>
      <TabPanel className={classes.tabContent} visible={tab === 'good-reviews'}>
        <PaginatedTaskList
          className={classes.list}
          error={reviews.good.error}
          loading={reviews.good.loading}
          data={reviews.good.data}
          hasNext={reviews.good.hasNext}
          page={reviews.good.page}
          onLoadPage={page => onLoadMoreGoodReviews(id, page)}
          Task={WorkerProfileTaskReview}
          emptyState={
            <EmptyStateContent
              className={classes.emptyState}
              summary="Nothing done yet"
              picture={emptyReviewImage}
            />
          }
        />
      </TabPanel>
      <TabPanel className={classes.tabContent} visible={tab === 'bad-reviews'}>
        <PaginatedTaskList
          className={classes.list}
          error={reviews.bad.error}
          loading={reviews.bad.loading}
          data={reviews.bad.data}
          hasNext={reviews.bad.hasNext}
          page={reviews.bad.page}
          onLoadPage={page => onLoadMoreBadReviews(id, page)}
          Task={WorkerProfileTaskReview}
          emptyState={
            <EmptyStateContent
              className={classes.emptyState}
              summary="Excellent!"
              details="No unfinished tasks"
              picture={emptyReviewImage}
            />
          }
        />
      </TabPanel>
    </Paper>
  );
}

WorkerTabs.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.object,
  reviews: PropTypes.object,
  isOwnProfile: PropTypes.bool,
  isEditPhotosModalOpen: PropTypes.bool,
  onEditPhotosButtonClick: PropTypes.func,
  onLoadMoreGoodReviews: PropTypes.func,
  onLoadMoreBadReviews: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isEditPhotosModalOpen: makeSelectProfilePageEditModalProp('isOpenPhotos'),
  profile: makeSelectProfilePageProfileProp('data'),
  reviews: makeSelectProfilePageWorkerReviews(),
});

const mapDispatchToProps = dispatch => ({
  onEditPhotosButtonClick: () => {
    dispatch(updateProfileEditPhotosModalIsOpen(true));
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
)(WorkerTabs);
