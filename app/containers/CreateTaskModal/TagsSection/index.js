import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(2),
  },
  tagsInputRoot: {
    padding: '12px 5px 14px 14px',
  },
}));

export function TagsSection({ tags, onAdd, onDelete }) {
  const classes = useStyles();

  return (
    <div className={classes.field}>
      <ChipInput
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
  );
}

TagsSection.propTypes = {
  tags: PropTypes.array,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};
