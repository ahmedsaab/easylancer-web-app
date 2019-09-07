import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

export default function YesNoSelector({ className, onChange, answer }) {
  const classes = makeStyles({
    root: {
      height: 'auto',
      padding: '5px',
      width: '50%',
      border: 'none',
    },
    selected: {
      color: `${answer ? '#47bf49' : '#dc4646'} !important`,
      backgroundColor: 'unset !important',
    },
    text: {
      width: '100%',
      textAlign: 'center',
      fontSize: '1.5rem',
    },
    icon: {
      fontSize: '5rem',
      width: '100%',
    },
  })({ answer });
  const { root, selected } = classes;

  const children = [
    <ToggleButton key={1} value="true" classes={{ root, selected }}>
      <div>
        <ThumbUpIcon className={classes.icon} />
        <div className={classes.text}>Yes</div>
      </div>
    </ToggleButton>,
    <ToggleButton key={2} value="false" classes={{ root, selected }}>
      <div>
        <ThumbDownIcon className={classes.icon} />
        <div className={classes.text}>No</div>
      </div>
    </ToggleButton>,
  ];

  return (
    <ToggleButtonGroup
      size="large"
      value={answer !== null ? answer.toString() : null}
      exclusive
      onChange={(event, selectedAnswer) => onChange(selectedAnswer === 'true')}
      className={className}
    >
      {children}
    </ToggleButtonGroup>
  );
}

YesNoSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  answer: PropTypes.bool,
};
