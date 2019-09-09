import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectTaskPageEditModalIsOpen,
  selectTaskPageEditModalIsLoading,
  selectTaskPageEditModalForm,
  selectTaskPageOffersData,
  selectTaskPageEditModalIsDirty,
} from 'containers/TaskPage/selectors';
import {
  editTask,
  updateEditModalIsOpen,
  updateEditModalFormGeneral,
  updateEditModalFormLocation,
  updateEditModalPushTag,
  updateEditModalRemoveTag,
  loadEditModalImages,
} from 'containers/TaskPage/actions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle, makeStyles, useTheme } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { TextSection } from 'components/organisms/TextSection';
import { PhotosSection } from 'components/organisms/PhotosSection';
import { LocationSection } from 'components/organisms/LocationSection';
import { DateTimeSection } from 'components/organisms/DateTimeSection';
import { TagsSection } from 'components/organisms/TagsSection';
import PaymentInput from 'components/molecules/PaymentInput';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DescriptionIcon from '@material-ui/icons/Description';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SectionHeader from 'components/molecules/SectionHeader';
import Spinner from 'components/atoms/Spinner';
import CenteredDiv from 'components/atoms/CenteredDiv';
import Bold from 'components/atoms/Bold';
import AttentionSection from 'containers/TaskPage/EditTaskModal/AttentionSection';
import Image from '../../../images/grafiti.jpg';

const useStyles = makeStyles(theme => ({
  text: {
    paddingBottom: '20px',
    fontSize: '1.1rem',
    textAlign: 'center',
  },
  header: {
    background: `url(${Image})`,
  },
  yesButton: {
    width: '120px',
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
}));

function EditTaskModal({
  isOpen,
  isDirty,
  isLoading,
  form,
  onSave,
  offers,
  onCloseModal,
  onUpdateFormGeneral,
  onUpdateFormLocation,
  onUpdateFormPushTag,
  onUpdateFormRemoveTag,
  loadImages,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isInvalid =
    !form.title ||
    !form.description ||
    !form.price ||
    !form.startDateTime ||
    form.startDateTimeError ||
    !(
      form.location.city &&
      form.country &&
      form.address &&
      form.location.geo
    ) ||
    (form.images && !!form.images.find(image => !image.uploaded));

  useEffect(() => {
    if (isOpen) {
      loadImages(form.imagesUrls);
    }
  }, [isOpen]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={onCloseModal}
      scroll="paper"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className={classes.header}>
        <div />
      </DialogTitle>
      {isLoading ? (
        <LinearProgress style={{ display: 'block', height: '5px' }} />
      ) : (
        <div style={{ display: 'block', height: '5px' }} />
      )}
      <DialogContent dividers>
        {offers && offers.length > 0 ? (
          <AttentionSection offers={offers} />
        ) : null}
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5}>
            <SectionHeader className={classes.iconText}>
              <DescriptionIcon className={classes.icon} />
              <Bold className={classes.iconText}>Description</Bold>
            </SectionHeader>
            <TextSection
              category={form.category}
              description={form.description}
              type={form.type}
              title={form.title}
              onUpdateTitle={t => onUpdateFormGeneral('title', t)}
              onUpdateDescription={d => onUpdateFormGeneral('description', d)}
            />
            <Divider
              className={classes.horizontalDivider}
              orientation="horizontal"
            />
            <SectionHeader>
              <EuroSymbolIcon className={classes.icon} />
              <Bold className={classes.iconText}>Payment</Bold>
            </SectionHeader>
            <PaymentInput
              price={form.price}
              paymentMethod={form.paymentMethod}
              onUpdatePrice={pr => onUpdateFormGeneral('price', pr)}
              onUpdatePaymentMethod={pm =>
                onUpdateFormGeneral('paymentMethod', pm)
              }
            />
            <Divider
              className={classes.horizontalDivider}
              orientation="horizontal"
            />
            <SectionHeader>
              <ScheduleIcon className={classes.icon} />
              <Bold className={classes.iconText}>Date & Time</Bold>
            </SectionHeader>
            <DateTimeSection
              dateTime={form.startDateTime}
              onAccept={dateTime => {
                onUpdateFormGeneral('startDateTimeError', null);
                onUpdateFormGeneral('startDateTime', dateTime);
              }}
              onError={err => onUpdateFormGeneral('startDateTimeError', err)}
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
              <LocationOnIcon className={classes.icon} />
              <Bold className={classes.iconText}>Location</Bold>
            </SectionHeader>
            <LocationSection
              country={form.country}
              address={form.address}
              city={form.location.city}
              geo={form.location.geo}
              onUpdateAddress={address => onUpdateFormLocation(address, null)}
              onUpdateLocation={location =>
                onUpdateFormLocation(location.address, location)
              }
            />
            <Divider
              className={classes.horizontalDivider}
              orientation="horizontal"
            />
            <SectionHeader>
              <SearchIcon className={classes.icon} />
              <Bold className={classes.iconText}>Tags</Bold>
            </SectionHeader>
            <TagsSection
              tags={form.tags}
              onAdd={tag => onUpdateFormPushTag(tag)}
              onDelete={(tag, index) => onUpdateFormRemoveTag(index)}
            />
            <Divider
              className={classes.horizontalDivider}
              orientation="horizontal"
            />
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
        <Button disabled={isLoading} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
          disabled={!isDirty || isLoading || isInvalid}
          className={classes.yesButton}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditTaskModal.propTypes = {
  isOpen: PropTypes.bool,
  isDirty: PropTypes.bool,
  isLoading: PropTypes.bool,
  offers: PropTypes.array,
  form: PropTypes.object,
  onSave: PropTypes.func,
  onCloseModal: PropTypes.func,
  onUpdateFormGeneral: PropTypes.func,
  onUpdateFormLocation: PropTypes.func,
  onUpdateFormPushTag: PropTypes.func,
  onUpdateFormRemoveTag: PropTypes.func,
  loadImages: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isDirty: selectTaskPageEditModalIsDirty,
  isOpen: selectTaskPageEditModalIsOpen,
  isLoading: selectTaskPageEditModalIsLoading,
  form: selectTaskPageEditModalForm,
  offers: selectTaskPageOffersData,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(updateEditModalIsOpen(false));
  },
  onSave: () => {
    dispatch(editTask());
  },
  onUpdateFormGeneral: (key, value) =>
    dispatch(updateEditModalFormGeneral(key, value)),
  onUpdateFormLocation: (address, location) =>
    dispatch(updateEditModalFormLocation(address, location)),
  onUpdateFormPushTag: tag => dispatch(updateEditModalPushTag(tag)),
  onUpdateFormRemoveTag: index => dispatch(updateEditModalRemoveTag(index)),
  loadImages: urls => dispatch(loadEditModalImages(urls)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditTaskModal);
