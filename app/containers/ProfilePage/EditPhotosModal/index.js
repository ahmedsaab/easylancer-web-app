import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, makeStyles, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { PhotosSection } from 'components/organisms/PhotosSection';
import Spinner from 'components/atoms/Spinner';
import CenteredDiv from 'components/atoms/CenteredDiv';
import DialogButton from 'components/atoms/DialogButton';
import MainDialogButton from 'components/hoc/LoadableMainDialogButton';
import {
  editProfile,
  loadProfileEditModalImages,
  updateProfileEditModalFormGeneral,
  updateProfileEditPhotosModalIsOpen,
} from 'containers/ProfilePage/actions';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageProfileProp,
} from 'containers/ProfilePage/selectors';
import { LoadingBar } from 'components/molecules/LoadingBar';
import Image from '../../../images/grafiti.jpg';

const useStyles = makeStyles(theme => ({
  dialogActionsLeft: {
    flex: '1',
    display: 'flex',
    marginLeft: theme.spacing(1),
  },
  dialogActionsRight: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    background: `url(${Image})`,
  },
}));

function EditPhotosModal({
  isLoading,
  form,
  profile,
  onSave,
  onCloseModal,
  onUpdateFormGeneral,
  loadImages,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isInvalid = form.images && !!form.images.find(image => !image.uploaded);
  const isDirty =
    (form.images &&
      JSON.stringify(form.images.map(image => image.url)) !==
        JSON.stringify(profile.imagesUrls)) ||
    (form.image && form.image.url && profile.imageUrl !== form.image.url);

  useEffect(() => {
    loadImages(form.imagesUrls);
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open
      onClose={onCloseModal}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className={classes.header}>
        <div />
      </DialogTitle>
      <LoadingBar isLoading={isLoading} />
      <DialogContent dividers>
        {form.images ? (
          <PhotosSection
            images={form.images}
            onUpdateImages={i => onUpdateFormGeneral('images', i)}
          />
        ) : (
          <CenteredDiv>
            <Spinner dimension="50px" />
          </CenteredDiv>
        )}
      </DialogContent>
      <DialogActions>
        <div className={classes.dialogActionsLeft}>
          <DialogButton disabled={isLoading} onClick={onCloseModal}>
            Cancel
          </DialogButton>
        </div>
        <div className={classes.dialogActionsRight}>
          <MainDialogButton
            onClick={onSave}
            color="primary"
            variant="contained"
            disabled={!isDirty || isInvalid || isLoading}
            autoFocus
          >
            Save
          </MainDialogButton>
        </div>
      </DialogActions>
    </Dialog>
  );
}

EditPhotosModal.propTypes = {
  isLoading: PropTypes.bool,
  form: PropTypes.object,
  profile: PropTypes.object,
  onSave: PropTypes.func,
  onCloseModal: PropTypes.func,
  onUpdateFormGeneral: PropTypes.func,
  loadImages: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectProfilePageEditModalProp('isLoading'),
  profile: makeSelectProfilePageProfileProp('data'),
  form: makeSelectProfilePageEditModalProp('form'),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(updateProfileEditPhotosModalIsOpen(false));
  },
  onSave: () => {
    dispatch(editProfile());
  },
  onUpdateFormGeneral: (key, value) =>
    dispatch(updateProfileEditModalFormGeneral(key, value)),
  loadImages: urls => dispatch(loadProfileEditModalImages(urls)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditPhotosModal);
