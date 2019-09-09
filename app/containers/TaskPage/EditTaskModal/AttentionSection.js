import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Bold from 'components/atoms/Bold';

const useStyles = makeStyles(theme => ({
  attentionIcon: {
    color: '#bba83c',
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
  attentionPaper: {
    padding: theme.spacing(2, 2, 3, 2),
    margin: '-16px -24px 10px -24px',
    backgroundColor: 'rgba(255,229,100,0.3)',
    fontSize: '0.8rem',
    borderLeftColor: '#ffe564',
    borderLeftWidth: '9px',
    borderLeftStyle: 'solid',
  },
  attentionHeader: {
    paddingBottom: theme.spacing(1),
    fontSize: '0.9rem',
  },
  contentPaper: {
    padding: theme.spacing(3, 2),
  },
  iconText: {
    verticalAlign: 'text-top',
  },
}));

/**
 * @return {null}
 */
export default function AttentionSection({ offers }) {
  const classes = useStyles();
  const receivedText = offers.length > 1 ? 'offers' : 'an offer';
  const names = offers.map(o => o.workerUser.firstName);
  const shownNames = names.slice(0, 3);
  let usersText = 'some users';

  switch (shownNames.length) {
    case 1:
      usersText = <Bold>{shownNames[0]}</Bold>;
      break;
    case 2:
      usersText = (
        <Fragment>
          <Bold>{shownNames[0]}</Bold> and <Bold>{shownNames[1]}</Bold>
        </Fragment>
      );
      break;
    default:
      usersText = (
        <Fragment>
          <Bold>{shownNames[0]}</Bold>, <Bold>{shownNames[1]}</Bold>, and{' '}
          <Bold>{names.length - 2} more</Bold>
        </Fragment>
      );
  }

  return (
    <div className={classes.attentionPaper}>
      <div className={classes.attentionHeader}>
        <WarningIcon className={classes.attentionIcon} />
        <Bold className={classes.iconText}>Note</Bold>
      </div>
      You already received {receivedText} on this task from {usersText}. Editing
      the task would remove their offers and notify them if they are still
      interested.
    </div>
  );
}

AttentionSection.propTypes = {
  offers: PropTypes.array,
};
