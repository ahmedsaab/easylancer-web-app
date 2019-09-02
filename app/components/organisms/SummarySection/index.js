import SelectDropDown from 'components/molecules/SelectDropDown';
import { categories } from 'containers/CreateTaskModal/constants';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    flex: 1,
  },
  section: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },
  row: {
    display: 'flex',
  },
}));

export function SummarySection({
  category,
  type,
  title,
  onSelectCategory,
  onSelectType,
  onUpdateTitle,
}) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.row}>
        <SelectDropDown
          onSelect={onSelectCategory}
          label="Category"
          selected={category}
          selection={categories}
          className={classes.field}
        />
        <SelectDropDown
          disabled={!category}
          onSelect={onSelectType}
          label="Type"
          selected={type}
          selection={category ? category.types : []}
          className={classes.field}
        />
      </div>
      <div className={classes.row}>
        <TextField
          error={!title}
          placeholder="e.g., Skilled wall painter needed"
          label="Title"
          className={classes.field}
          value={title}
          onChange={event => onUpdateTitle(event.target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
          multiline
          rows="2"
        />
      </div>
    </div>
  );
}

SummarySection.propTypes = {
  category: PropTypes.object,
  type: PropTypes.object,
  title: PropTypes.string,
  onSelectCategory: PropTypes.func,
  onSelectType: PropTypes.func,
  onUpdateTitle: PropTypes.func,
};
