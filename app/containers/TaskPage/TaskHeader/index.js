import React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  LocationText,
  SeenIcon,
  SeenInfo,
  StatusTime,
  TitleText,
} from 'containers/TaskPage/TaskHeader/components';
import PriceTag from 'components/molecules/PriceTag';
import StatusBadge from 'components/molecules/StatusBadge';
import Tag from 'components/atoms/Tag';
import { selectTaskPageTaskData } from 'containers/TaskPage/selectors';
import AttentionHeader from 'containers/TaskPage/TaskHeader/AttentionHeader';
import { formatTaskCreatedAt } from 'utils/date-time-helpers';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '120%',
  },
  price: {
    fontSize: '2.5rem',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  },
}));

function TaskHeader({ task }) {
  const classes = useStyles();
  const tags = task.tags.map(tag => <Tag key={tag}>{tag}</Tag>);

  return (
    <Grid className={classes.container} container spacing={0}>
      <Grid item xs={12}>
        <AttentionHeader task={task} />
      </Grid>
      <Grid item xs={12}>
        <StatusBadge status={task.status} />
        <SeenInfo>
          <SeenIcon far icon="eye" />
          {task.seenCount}
        </SeenInfo>
      </Grid>
      <Grid item xs={12}>
        <LocationText location={task.location} />
      </Grid>
      <Grid item xs={12} lg={9}>
        <TitleText>{task.title}</TitleText>
        <StatusTime>{formatTaskCreatedAt(task.createdAt)}</StatusTime>
      </Grid>
      <Grid item xs={12} lg={3}>
        <PriceTag
          className={classes.price}
          price={task.price}
          paymentMethod={task.paymentMethod}
        />
      </Grid>
      <Grid item xs={12}>
        {tags}
      </Grid>
    </Grid>
  );
}

TaskHeader.propTypes = {
  task: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TaskHeader);
