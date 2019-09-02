import TextField from '@material-ui/core/TextField';
import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import MultiPhotoUploader from 'components/organisms/MultiPhotoUploader';
import * as client from 'utils/client';

const useStyles = makeStyles(theme => ({
  field: {
    width: '100%',
  },
  row: {
    display: 'flex',
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const detailsPlaceholder =
  'e.g., I would like to make my hair exactly like the pictures. ' +
  'I want to also see the brand of the color you will use beforehand. ' +
  'Please show pictures of your work.';

export function DetailsSection({
  description,
  images,
  onUpdateImages,
  onUpdateDescription,
}) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <TextField
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
      <div className={classes.row}>
        <div className={classes.field}>
          <MultiPhotoUploader
            onUpdateUploadedImages={onUpdateImages}
            requestFileUpload={client.requestFileUpload}
            files={images}
            className={classes.field}
          />
        </div>
      </div>
    </div>
  );
}

DetailsSection.propTypes = {
  description: PropTypes.string,
  images: PropTypes.array,
  onUpdateImages: PropTypes.func,
  onUpdateDescription: PropTypes.func,
};
