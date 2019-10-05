import * as PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import EmptyStateContent from 'components/molecules/EmptyStateContent';
import { makeStyles, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from 'containers/ProfilePage/TabPanel';
import PaginatedTaskList from 'components/molecules/PaginatedTaskList';
import { OwnerProfileTaskReview } from 'containers/ProfilePage/ProfileTaskReview';
import * as emptyReviewImage from 'images/customer.png';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectProfilePageProfileProp,
  makeSelectProfilePageOwnerReviews,
} from 'containers/ProfilePage/selectors';
import {
  loadWorkerProfileBadReviews,
  loadWorkerProfileGoodReviews,
} from 'containers/ProfilePage/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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

export function CreatorTabs({
  id,
  profile,
  reviews,
  onLoadMoreGoodReviews,
  onLoadMoreBadReviews,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState('good-reviews');

  const onChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Paper elevation={0} className={classes.tabs}>
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
                {compact ? <ThumbUpIcon /> : <div>Done</div>}
                <div className={classes.tabNumber}>
                  {profile.ratings.creator.likes > 0
                    ? `(${profile.ratings.creator.likes})`
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
      <TabPanel className={classes.tabContent} visible={tab === 'good-reviews'}>
        <PaginatedTaskList
          className={classes.list}
          error={reviews.good.error}
          loading={reviews.good.loading}
          data={reviews.good.data}
          hasNext={reviews.good.hasNext}
          page={reviews.good.page}
          onLoadPage={page => onLoadMoreGoodReviews(id, page)}
          Task={OwnerProfileTaskReview}
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
          Task={OwnerProfileTaskReview}
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

CreatorTabs.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.object,
  reviews: PropTypes.object,
  onLoadMoreGoodReviews: PropTypes.func,
  onLoadMoreBadReviews: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfilePageProfileProp('data'),
  reviews: makeSelectProfilePageOwnerReviews(),
});

const mapDispatchToProps = dispatch => ({
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
)(CreatorTabs);
