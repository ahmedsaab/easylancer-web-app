import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import CenteredDiv from 'components/atoms/CenteredDiv';
import Avatar from 'components/molecules/Avatar';
import FullName from 'components/molecules/FullName';

const useStyles = makeStyles(() => ({
  name: {
    fontSize: '0.8rem',
  },
  image: {
    flexShrink: 1,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    fontSize: '0.8rem',
    color: '#9e9595',
  },
}));

export function AssigneeCard({ user }) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.header}>Assignee</div>
      <CenteredDiv className={classes.container}>
        <Avatar
          imgSrc={user.imageUrl}
          imgStyle={{ width: '60px', height: '60px', objectFit: 'cover' }}
          className={classes.image}
        />
        <FullName className={classes.name} user={user} />
      </CenteredDiv>
    </Fragment>
  );
}

AssigneeCard.propTypes = {
  user: PropTypes.object,
};
