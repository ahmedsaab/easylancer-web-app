import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import Avatar from 'components/molecules/Avatar';
import FullName from 'components/molecules/FullName';

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: '0.8rem',
    maxWidth: '80%',
    paddingLeft: theme.spacing(1),
    lineHeight: '35px',
  },
  image: {
    maxWidth: '20%',
    flexShrink: 1,
  },
  container: {
    display: 'flex',
    alignItems: 'left',
  },
}));

export function CreatorFooter({ user }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Avatar
        imgSrc={user.imageUrl}
        imgStyle={{ width: '35px', height: '35px', objectFit: 'cover' }}
        className={classes.image}
      />
      <FullName className={classes.name} user={user} />
    </div>
  );
}

CreatorFooter.propTypes = {
  user: PropTypes.object,
};
