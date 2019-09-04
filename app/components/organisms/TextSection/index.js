import SelectDropDown from 'components/molecules/SelectDropDown';
import { categories } from 'containers/CreateTaskModal/constants';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const detailsPlaceholder =
  'e.g., I would like to make my hair exactly like the pictures. ' +
  'I want to also see the brand of the color you will use beforehand. ' +
  'Please show pictures of your work.';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    flex: 1,
  },
  row: {
    display: 'flex',
  },
}));

export function TextSection({
  category,
  type,
  title,
  description,
  onSelectCategory,
  onSelectType,
  onUpdateTitle,
  onUpdateDescription,
}) {
  const classes = useStyles();

  return (
    <div>
      {onSelectCategory && onSelectType ? (
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
      ) : null}
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
      <div className={classes.row}>
        <TextField
          error={!description}
          placeholder={detailsPlaceholder}
          label="Details"
          className={classes.field}
          value={description}
          onChange={event => onUpdateDescription(event.target.value)}
          margin="none"
          variant="outlined"
          fullWidth
          multiline
          rows="5"
        />
      </div>
    </div>
  );
}

TextSection.propTypes = {
  category: PropTypes.object,
  type: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  onSelectCategory: PropTypes.func,
  onSelectType: PropTypes.func,
  onUpdateTitle: PropTypes.func,
  onUpdateDescription: PropTypes.func,
};
