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

export function PhotosSection({ images, onUpdateImages }) {
  const classes = useStyles();

  return (
    <div>
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

PhotosSection.propTypes = {
  images: PropTypes.array,
  onUpdateImages: PropTypes.func,
};
