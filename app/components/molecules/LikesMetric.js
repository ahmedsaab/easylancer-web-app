import React from 'react';
import * as PropTypes from 'prop-types';
import IconWithNumber from 'components/molecules/IconWithNumber';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    display: 'inline',
  },
  divider: {
    display: 'inline',
    fontWeight: 900,
    padding: theme.spacing(0, 2),
  },
}));

function LikesMetric({ likes, dislikes, className }) {
  const classes = useStyles();

  return (
    <div className={className}>
      <IconWithNumber
        className={classes.icon}
        iconColor="green"
        Icon={ThumbUpAltOutlinedIcon}
        metric={likes}
      />
      <div className={classes.divider}>/</div>
      <IconWithNumber
        className={classes.icon}
        iconColor="red"
        Icon={ThumbDownOutlinedIcon}
        metric={dislikes}
      />
    </div>
  );
}

LikesMetric.propTypes = {
  className: PropTypes.object,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
};

export default LikesMetric;
