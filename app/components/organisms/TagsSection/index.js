import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    width: '100%',
  },
  tagsInputRoot: {
    padding: '12px 5px 9px 14px',
  },
  row: {
    display: 'flex',
  },
}));

export function TagsSection({ tags, onAdd, onDelete }) {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.field}>
        <ChipInput
          fullWidth
          label="#"
          variant="outlined"
          value={tags}
          onAdd={onAdd}
          onDelete={onDelete}
          classes={{
            inputRoot: classes.tagsInputRoot,
          }}
        />
      </div>
    </div>
  );
}

TagsSection.propTypes = {
  tags: PropTypes.array,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};
