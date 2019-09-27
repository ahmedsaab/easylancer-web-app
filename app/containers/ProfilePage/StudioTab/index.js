import * as PropTypes from 'prop-types';
import React from 'react';
import LightBoxImagesGrid from 'components/organisms/LightBoxImagesGrid';
import EmptyStateContent from 'components/molecules/EmptyStateContent';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles(theme => ({
  emptyState: {
    minHeight: '350px',
    margin: theme.spacing(-2, -3),
  },
  emptyStateButton: {
    margin: theme.spacing(2),
    padding: theme.spacing(1, 2, 1, 2),
    fontSize: '0.7rem',
  },
  emptyStateButtonIcon: {
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
}));

export function StudioTab({ imagesUrls, onAddImages }) {
  const classes = useStyles();

  if (imagesUrls.length === 0) {
    return (
      <EmptyStateContent
        className={classes.emptyState}
        summary="No photos uploaded"
      >
        {onAddImages ? (
          <Button
            onClick={onAddImages}
            color="primary"
            className={classes.emptyStateButton}
          >
            <AddAPhotoIcon className={classes.emptyStateButtonIcon} />
            Add Pictures
          </Button>
        ) : null}
      </EmptyStateContent>
    );
  }
  return <LightBoxImagesGrid images={imagesUrls} />;
}

StudioTab.propTypes = {
  imagesUrls: PropTypes.array,
  onAddImages: PropTypes.func,
};
