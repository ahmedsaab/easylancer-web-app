import React from 'react';
import * as PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Avatar from 'components/molecules/Avatar';
import LikesMetric from 'components/molecules/LikesMetric';
import FullName from 'components/molecules/FullName';
import history from 'utils/history';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    margin: '0',
    display: 'flex',
    alignItems: 'left',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0,0,0,0.2)',
    outline: 0,
    cursor: 'pointer',
  },
  name: {
    fontSize: '20px',
    fontWeight: '700',
  },
  image: {
    flexShrink: 1,
  },
  data: {
    flex: 3,
    paddingLeft: theme.spacing(2),
  },
  likes: {
    fontSize: '16px',
    paddingTop: '8px',
  },
}));

export default function TaskOwner({ user }) {
  const classes = useStyles();

  return (
    <Paper
      elevation={0}
      className={classes.container}
      onClick={() => history.push(`/profile/${user.id}`)}
    >
      <Avatar
        imgSrc={user.imageUrl}
        isApproved={user.approved}
        imgStyle={{ width: '80px', height: '80px', objectFit: 'cover' }}
        className={classes.image}
      />
      <div className={classes.data}>
        <FullName className={classes.name} user={user} />
        <LikesMetric
          className={classes.likes}
          likes={user.likes}
          dislikes={user.dislikes}
        />
      </div>
    </Paper>
  );
}

TaskOwner.propTypes = {
  user: PropTypes.object,
};
