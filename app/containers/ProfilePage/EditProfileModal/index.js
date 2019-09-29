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
import { TextSection } from 'components/organisms/TextSection';
import { PhotosSection } from 'components/organisms/PhotosSection';
import { LocationSection } from 'components/organisms/LocationSection';
import { DateTimeSection } from 'components/organisms/DateTimeSection';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SectionHeader from 'components/molecules/SectionHeader';
import Spinner from 'components/atoms/Spinner';
import CenteredDiv from 'components/atoms/CenteredDiv';
import Bold from 'components/atoms/Bold';
import DialogButton from 'components/atoms/DialogButton';
import MainDialogButton from 'components/hoc/LoadableMainDialogButton';
import {
  editProfile,
  loadProfileEditModalImages,
  loadProfileEditModalProfileImage,
  updateProfileEditModalFormGeneral,
  updateProfileEditModalIsOpen,
} from 'containers/ProfilePage/actions';
import {
  makeSelectProfilePageEditModalProp,
  makeSelectProfilePageProfileProp,
} from 'containers/ProfilePage/selectors';
import { LoadingBar } from 'components/molecules/LoadingBar';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TranslateIcon from '@material-ui/icons/Translate';
import { AboutSection } from 'containers/ProfilePage/EditProfileModal/AboutSection';
import { LanguagesSection } from 'containers/ProfilePage/EditProfileModal/LanguagesSection';
import * as client from 'utils/client';
import ProfilePhotoUploader from 'components/organisms/ProfilePhotoUploader';
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
  text: {
    paddingBottom: '20px',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  header: {
    background: `url(${Image})`,
  },
  divider: {
    margin: 'auto',
  },
  horizontalDivider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  icon: {
    color: '#2BBBAD',
    marginRight: theme.spacing(1),
  },
  hideInDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconText: {
    verticalAlign: 'text-top',
  },
  profileImage: {
    marginTop: theme.spacing(-1),
  },
}));

function EditProfileModal({
  isLoading,
  form,
  profile,
  onSave,
  onCloseModal,
  onUpdateFormGeneral,
  loadImages,
  loadImage,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isInvalid =
    (form.images && !!form.images.find(image => !image.uploaded)) ||
    (form.image && !form.image.uploaded);
  const isDirty =
    form.about !== profile.about ||
    JSON.stringify(form.languages) !== JSON.stringify(profile.languages) ||
    (form.images &&
      JSON.stringify(form.images.map(image => image.url)) !==
        JSON.stringify(profile.imagesUrls)) ||
    (form.image && form.image.url && profile.imageUrl !== form.image.url);

  useEffect(() => {
    loadImages(form.imagesUrls);
    loadImage(form.imageUrl || form.imagesUrls[0]);
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
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
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5}>
            <SectionHeader className={classes.iconText}>
              <PersonIcon className={classes.icon} />
              <Bold className={classes.iconText}>Photo</Bold>
            </SectionHeader>
            <div className={classes.profileImage}>
              {form.image ? (
                <ProfilePhotoUploader
                  onUpdateUploadedImage={i => onUpdateFormGeneral('image', i)}
                  requestFileUpload={client.requestFileUpload}
                  profileFile={form.image}
                />
              ) : (
                <CenteredDiv>
                  <Spinner dimension="50px" />
                </CenteredDiv>
              )}
            </div>
            <Divider
              className={classes.horizontalDivider}
              orientation="horizontal"
            />
            <SectionHeader className={classes.iconText}>
              <InfoOutlinedIcon className={classes.icon} />
              <Bold className={classes.iconText}>About</Bold>
            </SectionHeader>
            <AboutSection
              about={form.about}
              onUpdateAbout={a => onUpdateFormGeneral('about', a)}
            />
            <Divider
              className={classes.horizontalDivider}
              orientation="horizontal"
            />
            <SectionHeader>
              <TranslateIcon className={classes.icon} />
              <Bold className={classes.iconText}>Languages</Bold>
            </SectionHeader>
            <LanguagesSection
              onChange={langs =>
                onUpdateFormGeneral(
                  'languages',
                  langs ? langs.map(l => l.value.toUpperCase()) : [],
                )
              }
              languages={form.languages}
            />
            <Divider
              className={`${classes.horizontalDivider} ${
                classes.hideInDesktop
              }`}
              orientation="horizontal"
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Divider className={classes.divider} orientation="vertical" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SectionHeader>
              <PhotoLibraryIcon className={classes.icon} />
              <Bold className={classes.iconText}>Photos</Bold>
            </SectionHeader>
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
          </Grid>
        </Grid>
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

EditProfileModal.propTypes = {
  isLoading: PropTypes.bool,
  form: PropTypes.object,
  profile: PropTypes.object,
  onSave: PropTypes.func,
  onCloseModal: PropTypes.func,
  onUpdateFormGeneral: PropTypes.func,
  loadImages: PropTypes.func,
  loadImage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectProfilePageEditModalProp('isLoading'),
  profile: makeSelectProfilePageProfileProp('data'),
  form: makeSelectProfilePageEditModalProp('form'),
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(updateProfileEditModalIsOpen(false));
  },
  onSave: () => {
    dispatch(editProfile());
  },
  onUpdateFormGeneral: (key, value) =>
    dispatch(updateProfileEditModalFormGeneral(key, value)),
  loadImages: urls => dispatch(loadProfileEditModalImages(urls)),
  loadImage: url => dispatch(loadProfileEditModalProfileImage(url)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditProfileModal);
