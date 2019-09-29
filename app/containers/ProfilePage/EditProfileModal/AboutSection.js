import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const aboutPlaceholder =
  'e.g., I would like to make my hair exactly like the pictures. ' +
  'I want to also see the brand of the color you will use beforehand. ' +
  'Please show pictures of your work.';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(-1, 1, 1, 1),
    flex: 1,
  },
  row: {
    display: 'flex',
  },
}));

export function AboutSection({ about, onUpdateAbout }) {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <TextField
        placeholder={aboutPlaceholder}
        className={classes.field}
        value={about}
        onChange={event => {
          onUpdateAbout(event.target.value);
        }}
        margin="none"
        variant="outlined"
        fullWidth
        multiline
        rows="5"
      />
    </div>
  );
}

AboutSection.propTypes = {
  about: PropTypes.string,
  onUpdateAbout: PropTypes.func,
};
