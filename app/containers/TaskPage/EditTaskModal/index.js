import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectTaskPageEditModalIsOpen,
  selectTaskPageEditModalIsLoading,
  selectTaskPageEditModalForm,
} from 'containers/TaskPage/selectors';
import {
  editTask,
  updateEditModalIsOpen,
  updateEditModalFormGeneral,
  updateEditModalFormCountry,
  updateEditModalFormLocation,
  updateEditModalPushTag,
  updateEditModalRemoveTag,
} from 'containers/TaskPage/actions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle, makeStyles, useTheme } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { SummarySection } from 'components/organisms/SummarySection';
import { DetailsSection } from 'components/organisms/DetailsSection';
import { LocationSection } from 'components/organisms/LocationSection';
import { DateTimeSection } from 'components/organisms/DateTimeSection';
import { TagsSection } from 'components/organisms/TagsSection';
import PaymentInput from 'components/molecules/PaymentInput';
import Image from '../../../images/grafiti.jpg';

const useStyles = makeStyles(() => ({
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
}));

function EditTaskModal({
  isOpen,
  isLoading,
  form,
  onSave,
  onCloseModal,
  onUpdateFormGeneral,
  onUpdateFormLocation,
  onUpdateFormCountry,
  onUpdateFormPushTag,
  onUpdateFormRemoveTag,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <DialogTitle className={classes.header} />
      {isLoading ? (
        <LinearProgress style={{ display: 'block', height: '5px' }} />
      ) : (
        <div style={{ display: 'block', height: '5px' }} />
      )}
      <DialogContent dividers>
        <SummarySection
          category={form.category}
          type={form.type}
          title={form.title}
          onSelectCategory={c => onUpdateFormGeneral('category', c)}
          onSelectType={t => onUpdateFormGeneral('type', t)}
          onUpdateTitle={t => onUpdateFormGeneral('title', t)}
        />
        <DetailsSection
          description={form.description}
          images={form.images}
          onUpdateImages={i => onUpdateFormGeneral('images', i)}
          onUpdateDescription={d => onUpdateFormGeneral('description', d)}
        />
        <PaymentInput
          price={form.price}
          paymentMethod={form.paymentMethod}
          onUpdatePrice={pr => onUpdateFormGeneral('price', pr)}
          onUpdatePaymentMethod={pm => onUpdateFormGeneral('paymentMethod', pm)}
        />
        <LocationSection
          country={form.country}
          address={form.address}
          onUpdateAddress={address => onUpdateFormLocation(address, null)}
          onUpdateCountry={onUpdateFormCountry}
          onUpdateLocation={location =>
            onUpdateFormLocation(location.address, location)
          }
        />
        <DateTimeSection
          dateTime={form.startDateTime}
          onAccept={dateTime => {
            onUpdateFormGeneral('startDateTimeError', null);
            onUpdateFormGeneral('startDateTime', dateTime);
          }}
          onError={err => onUpdateFormGeneral('startDateTimeError', err)}
        />
        <TagsSection
          tags={form.tags}
          onAdd={tag => onUpdateFormPushTag(tag)}
          onDelete={(tag, index) => onUpdateFormRemoveTag(index)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
          disabled={isLoading}
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
  isLoading: PropTypes.bool,
  form: PropTypes.object,
  onSave: PropTypes.func,
  onCloseModal: PropTypes.func,
  onUpdateFormGeneral: PropTypes.func,
  onUpdateFormLocation: PropTypes.func,
  onUpdateFormCountry: PropTypes.func,
  onUpdateFormPushTag: PropTypes.func,
  onUpdateFormRemoveTag: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpen: selectTaskPageEditModalIsOpen,
  isLoading: selectTaskPageEditModalIsLoading,
  form: selectTaskPageEditModalForm,
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
  onUpdateFormCountry: country => dispatch(updateEditModalFormCountry(country)),
  onUpdateFormPushTag: tag => dispatch(updateEditModalPushTag(tag)),
  onUpdateFormRemoveTag: index => dispatch(updateEditModalRemoveTag(index)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditTaskModal);
