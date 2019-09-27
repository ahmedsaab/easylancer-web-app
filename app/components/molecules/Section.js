import React from 'react';
import * as PropTypes from 'prop-types';
import SectionLabel from 'components/atoms/SectionLabel';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  none: {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    color: 'grey',
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: '1.3rem',
  },
}));

function Section({
  title,
  Icon,
  children,
  className,
  visible = true,
  valid = true,
}) {
  const classes = useStyles();

  return (
    <div style={{ display: visible ? 'block' : 'none' }} className={className}>
      <SectionLabel>
        {Icon ? <Icon className={classes.icon} /> : null}
        {title}
      </SectionLabel>
      {valid ? <div>{children}</div> : <div className={classes.none}>None</div>}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  Icon: PropTypes.any,
  className: PropTypes.string,
  visible: PropTypes.bool,
  valid: PropTypes.bool,
};

export default Section;
