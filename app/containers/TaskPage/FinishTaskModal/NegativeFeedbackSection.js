import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles(theme => ({
  question: {
    fontSize: '1.4rem',
    paddingBottom: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  answer: {
    padding: theme.spacing(0, 3, 3),
    textAlign: 'left',
    width: '100%',
  },
}));

const ownerOptions = [
  'The worker did not show up on time',
  'The worker was not able to do the task',
];

const workerOptions = [
  'The owner was unreachable and/or unresponsive',
  'The task was diffrent from what was described',
];

export default function NegativeFeedbackSection({
  isTaskOwner,
  message,
  otherReason,
  onUpdateMessage,
  onUpdateOtherReason,
}) {
  const classes = useStyles();
  const options = isTaskOwner ? ownerOptions : workerOptions;

  const radioSelections = options.map(option => (
    <FormControlLabel
      value={option}
      control={<Radio />}
      label={option}
      key={option}
    />
  ));

  return (
    <Fragment>
      <Divider className={classes.divider} orientation="horizontal" />
      <div className={classes.section}>
        <div className={classes.question}>What went wrong?</div>
        <div className={classes.answer}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.group}
            value={message}
            onChange={event => onUpdateMessage(event.target.value)}
          >
            {radioSelections}
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {message === 'other' ? (
            <TextField
              placeholder="Please specify"
              value={otherReason}
              onChange={event => onUpdateOtherReason(event.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows="3"
            />
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

NegativeFeedbackSection.propTypes = {
  isTaskOwner: PropTypes.bool,
  message: PropTypes.string,
  otherReason: PropTypes.string,
  onUpdateMessage: PropTypes.func,
  onUpdateOtherReason: PropTypes.func,
};
