import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 'inherit',
  },
}));

function IconWithNumber({ metric, Icon, iconColor, className }) {
  const classes = useStyles();

  return (
    <div className={className}>
      <Icon className={classes.icon} style={{ color: iconColor }} />
      {metric}
    </div>
  );
}

IconWithNumber.propTypes = {
  iconColor: PropTypes.string,
  metric: PropTypes.number,
  Icon: PropTypes.any,
  className: PropTypes.string,
};

export default IconWithNumber;
