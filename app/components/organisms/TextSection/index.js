import SelectDropDown from 'components/molecules/SelectDropDown';
import { categories } from 'containers/CreateTaskModal/constants';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
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
  const [dirty, setDirty] = useState({
    title: false,
    description: false,
  });

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
          error={!title && dirty.title}
          placeholder="e.g., Skilled wall painter needed"
          label="Title"
          className={classes.field}
          value={title}
          onChange={event => {
            setDirty({ ...dirty, title: true });
            onUpdateTitle(event.target.value);
          }}
          margin="normal"
          variant="outlined"
          fullWidth
          multiline
          rows="2"
        />
      </div>
      <div className={classes.row}>
        <TextField
          error={!description && dirty.description}
          placeholder={detailsPlaceholder}
          label="Details"
          className={classes.field}
          value={description}
          onChange={event => {
            setDirty({ ...dirty, description: true });
            onUpdateDescription(event.target.value);
          }}
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
