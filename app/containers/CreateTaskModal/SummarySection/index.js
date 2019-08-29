import SelectDropDown from 'components/molecules/SelectDropDown';
import { categories } from 'containers/CreateTaskModal/constants';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  field: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1,
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
    <div>
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
