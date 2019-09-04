import produce from 'immer';
import {
  LOAD_TASK,
  LOAD_TASK_ERROR,
  LOAD_TASK_OFFERS_ERROR,
  LOAD_TASK_SUCCESS,
  LOAD_TASK_OFFERS_SUCCESS,
  ACCEPT_OFFER,
  ACCEPT_OFFER_ERROR,
  ACCEPT_OFFER_SUCCESS,
  VIEW_OFFER,
  SEND_OFFER_FAIL,
  SEND_OFFER,
  SEND_OFFER_SUCCESS,
  UPDATE_OFFER_MESSAGE,
  UPDATE_OFFER_PAYMENT,
  UPDATE_OFFER_PRICE,
  UPDATE_ASSIGNED_MODAL_IS_OPEN,
  UPDATE_WITHDRAW_MODAL_IS_OPEN,
  RESET_OFFER_FORM_STATUS,
  UPDATE_OFFER_FORM_IS_OPEN,
  WITHDRAW_OFFER,
  WITHDRAW_OFFER_SUCCESS,
  WITHDRAW_OFFER_ERROR,
  CANCEL_TASK,
  CANCEL_TASK_SUCCESS,
  CANCEL_TASK_ERROR,
  UPDATE_CANCEL_MODAL_IS_OPEN,
  EDIT_TASK,
  UPDATE_EDIT_MODAL_IS_OPEN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  UPDATE_EDIT_MODAL_FORM_GENERAL,
  UPDATE_EDIT_MODAL_FORM_LOCATION,
  UPDATE_EDIT_MODAL_FORM_REMOVE_TAG,
  UPDATE_EDIT_MODAL_FORM_PUSH_TAG,
  UPDATE_EDIT_MODAL_IMAGES_LOADED,
} from 'containers/TaskPage/constants';
import { categories, countries } from 'containers/CreateTaskModal/constants';

export const createPayloadFromForm = form => ({
  ...form,
  imagesUrls: form.images
    .filter(image => image.uploaded)
    .map(image => image.url),
  category: form.category.text.toLowerCase(),
  type: form.type.text.toLowerCase(),
  location: {
    address: form.address,
    country: form.location.country.toLowerCase(),
    city: form.location.city.toLowerCase(),
    geo: form.location.geo,
  },
  tags: form.tags,
});

export const createFormFromPayload = payload => ({
  ...payload,
  category: categories.find(c => c.text.toLowerCase() === payload.category),
  type: categories
    .find(c => c.text.toLowerCase() === payload.category)
    .types.find(t => t.text.toLowerCase() === payload.type),
  startDateTimeError: null,
  country: countries.find(
    c => c.text.toLowerCase() === payload.location.country,
  ),
  address: payload.location.address,
});

export const initialState = {
  id: null,
  task: {
    data: null,
    loading: true,
    error: null,
  },
  cancelModal: {
    isOpen: false,
    isLoading: false,
  },
  editModal: {
    isOpen: false,
    isLoading: false,
    form: {
      price: null,
      currency: '',
      paymentMethod: null,
      title: '',
      description: '',
      category: null,
      type: null,
      images: [],
      tags: [],
      startDateTime: null,
      startDateTimeError: null,
      country: null,
      address: '',
      location: {
        city: null,
        geo: null,
      },
    },
  },
  offers: {
    data: null,
    loading: true,
    error: null,
  },
  offer: {
    withdrawModal: {
      isOpen: false,
      isLoading: false,
    },
    assignedModalIsOpen: false,
    data: null,
    actions: {
      hire: null,
      withdraw: null,
    },
    form: {
      data: {
        message: '',
        price: '',
        payment: 'card',
      },
      status: null,
      isOpen: false,
    },
  },
};

/* eslint-disable default-case, no-param-reassign */
const taskPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASK:
        draft.task.loading = true;
        draft.id = action.id;
        break;

      case LOAD_TASK_SUCCESS:
        draft.task.data = action.data;
        draft.task.loading = false;
        draft.editModal.form = createFormFromPayload(action.data);
        break;

      case LOAD_TASK_ERROR:
        draft.task.error = action.error;
        draft.task.loading = false;
        break;

      case LOAD_TASK_OFFERS_SUCCESS:
        draft.offers.data = action.data;
        draft.offers.loading = false;
        break;

      case LOAD_TASK_OFFERS_ERROR:
        draft.offers.loading = false;
        draft.offers.error = action.error;
        break;

      case VIEW_OFFER:
        draft.offer.data = draft.offers.data.find(
          offer => offer.id === action.offerId,
        );
        break;

      case ACCEPT_OFFER:
        draft.offer.actions.hire = 'loading';
        break;

      case ACCEPT_OFFER_SUCCESS:
        draft.offer.actions.hire = 'success';
        break;

      case ACCEPT_OFFER_ERROR:
        draft.offer.actions.hire = 'error';
        break;

      case UPDATE_OFFER_PRICE:
        draft.offer.form.data.price = action.price;
        break;

      case UPDATE_OFFER_PAYMENT:
        draft.offer.form.data.payment = action.payment;
        break;

      case UPDATE_OFFER_MESSAGE:
        draft.offer.form.data.message = action.message;
        break;

      case SEND_OFFER:
        draft.offer.form.status = 'loading';
        break;

      case SEND_OFFER_SUCCESS:
        draft.offer.form.status = 'success';
        break;

      case SEND_OFFER_FAIL:
        draft.offer.form.status = 'failed';
        break;

      case RESET_OFFER_FORM_STATUS:
        draft.offer.form.status = initialState.offer.form.status;
        break;

      case UPDATE_OFFER_FORM_IS_OPEN:
        if (action.isOpen) {
          draft.offer.form.isOpen = true;
        } else {
          draft.offer.form = initialState.offer.form;
        }
        break;

      case UPDATE_ASSIGNED_MODAL_IS_OPEN:
        draft.offer.assignedModalIsOpen = action.isOpen;
        break;

      case WITHDRAW_OFFER:
        draft.offer.withdrawModal.isLoading = true;
        break;

      case UPDATE_WITHDRAW_MODAL_IS_OPEN:
        draft.offer.withdrawModal.isOpen = action.isOpen;
        break;

      case WITHDRAW_OFFER_SUCCESS:
      case WITHDRAW_OFFER_ERROR:
        draft.offer.withdrawModal.isLoading = false;
        draft.offer.withdrawModal.isOpen = false;
        break;

      case CANCEL_TASK:
        draft.cancelModal.isLoading = true;
        break;

      case UPDATE_CANCEL_MODAL_IS_OPEN:
        draft.cancelModal.isOpen = action.isOpen;
        break;

      case CANCEL_TASK_SUCCESS:
      case CANCEL_TASK_ERROR:
        draft.cancelModal.isLoading = false;
        draft.cancelModal.isOpen = false;
        break;

      case UPDATE_EDIT_MODAL_FORM_GENERAL:
        draft.editModal.isDirty = true;
        draft.editModal.form[action.key] = action.value;
        if (action.key === 'category') {
          draft.editModal.form.type = null;
        }
        break;

      case UPDATE_EDIT_MODAL_FORM_LOCATION:
        draft.editModal.isDirty = true;
        draft.editModal.form.address = action.address;
        draft.editModal.form.location =
          action.location || initialState.editModal.form.location;
        break;

      case UPDATE_EDIT_MODAL_FORM_REMOVE_TAG:
        draft.editModal.isDirty = true;
        draft.editModal.form.tags = draft.editModal.form.tags
          .slice(0, action.index)
          .concat(
            draft.editModal.form.tags.slice(
              action.index + 1,
              draft.editModal.form.tags.length,
            ),
          );
        break;

      case UPDATE_EDIT_MODAL_FORM_PUSH_TAG:
        draft.editModal.isDirty = true;
        draft.editModal.form.tags = draft.editModal.form.tags.concat([
          action.tag.toLowerCase(),
        ]);
        break;

      case UPDATE_EDIT_MODAL_IS_OPEN:
        draft.editModal.isOpen = action.isOpen;
        if (!action.isOpen) {
          draft.editModal.form = createFormFromPayload(draft.task.data);
          draft.editModal.isDirty = false;
        }
        break;

      case UPDATE_EDIT_MODAL_IMAGES_LOADED:
        draft.editModal.form.images = action.files.map((file, i) => ({
          data: file.data,
          id: `file_${i}`,
          url: file.url,
          uploaded: true,
        }));
        break;

      case EDIT_TASK:
        draft.editModal.isLoading = true;
        break;

      case EDIT_TASK_SUCCESS:
        draft.editModal.isOpen = false;
        draft.editModal.isLoading = false;
        draft.editModal.isDirty = false;
        draft.editModal.form = initialState.editModal.form;
        break;

      case EDIT_TASK_ERROR:
        draft.editModal.isLoading = false;
        break;
    }
  });

export default taskPageReducer;
