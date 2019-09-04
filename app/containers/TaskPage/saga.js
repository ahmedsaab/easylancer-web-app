import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import {
  LOAD_TASK,
  LOAD_TASK_OFFERS,
  ACCEPT_OFFER,
  SEND_OFFER,
  WITHDRAW_OFFER,
  CANCEL_TASK,
  EDIT_TASK,
  LOAD_EDIT_MODAL_IMAGES,
} from 'containers/TaskPage/constants';
import {
  loadTaskOffers,
  taskLoaded,
  taskLoadingError,
  taskOffersLoaded,
  taskOffersLoadingError,
  acceptOfferError,
  acceptOfferSuccess,
  viewOffer,
  offerSentError,
  offerSentSuccess,
  updateOfferModalPayment,
  updateOfferModalPrice,
  updateAssignedModalIsOpen,
  loadTask,
  withdrawOfferSuccess,
  withdrawOfferError,
  cancelTaskSuccess,
  cancelTaskError,
  editTaskSuccess,
  editTaskError,
  updateEditModalImagesLoaded,
} from 'containers/TaskPage/actions';
import * as client from 'utils/client';

import history from 'utils/history';
import { makeSelectGlobalLocation } from 'containers/App/selectors';
import {
  selectTaskPageTaskData,
  selectTaskPageOfferFormData,
  selectTaskPageEditModalForm,
} from 'containers/TaskPage/selectors';
import { createPayloadFromForm } from 'containers/TaskPage/reducer';

export const offerUrlRegex = RegExp(/offers\/[0-9a-f]/i);

export function* getTask() {
  const location = yield select(makeSelectGlobalLocation());
  const id = location.pathname.split('/')[2];

  try {
    const task = yield call(client.getTask, id);
    yield put(updateOfferModalPrice(task.price));
    yield put(updateOfferModalPayment(task.paymentMethod));
    yield put(taskLoaded(task));
  } catch (err) {
    yield put(taskLoadingError(err));
  }
}

export function* getTaskOffers() {
  const location = yield select(makeSelectGlobalLocation());
  const id = location.pathname.split('/')[2];

  try {
    const offers = yield call(client.getTaskOffers, id);
    yield put(taskOffersLoaded(offers));
    // eslint-disable-next-line no-restricted-globals
    if (offerUrlRegex.test(location.pathname)) {
      yield put(viewOffer(location.pathname.split('/').pop()));
    }
  } catch (err) {
    yield put(taskOffersLoadingError(err));
  }
}

export function* acceptOffer() {
  const location = yield select(makeSelectGlobalLocation());
  const taskId = location.pathname.split('/')[2];
  const offerId = location.pathname.split('/').pop();

  try {
    yield call(client.acceptOffer, taskId, offerId);
    yield put(acceptOfferSuccess());
    yield put(loadTaskOffers(taskId));
    yield put(loadTask(taskId));
    yield put(updateAssignedModalIsOpen(true));

    history.push(`/task/${taskId}`);
  } catch (err) {
    yield put(acceptOfferError(err));
  }
}

export function* postOffer() {
  const { id } = yield select(selectTaskPageTaskData);
  const offer = yield select(selectTaskPageOfferFormData);

  try {
    yield call(client.postOffer, id, offer);
    yield put(offerSentSuccess());
    yield put(loadTaskOffers(id));
    history.push(`/task/${id}/offers/`);
  } catch (err) {
    yield put(offerSentError(err));
  }
}

export function* withdrawOffer() {
  const { id } = yield select(selectTaskPageTaskData);

  try {
    yield call(client.withdrawOffer, id);
    yield put(withdrawOfferSuccess());
    yield put(loadTaskOffers(id));
    history.push(`/task/${id}/offers/`);
  } catch (err) {
    yield put(withdrawOfferError(err));
    console.log(err);
  }
}

export function* cancelTask() {
  const { id } = yield select(selectTaskPageTaskData);

  try {
    yield call(client.cancelTask, id);
    yield put(cancelTaskSuccess());
    yield put(loadTask(id));
    history.push(`/task/${id}`);
  } catch (err) {
    yield put(cancelTaskError(err));
    console.log(err);
  }
}

export function* editTask() {
  const form = yield select(selectTaskPageEditModalForm);
  const { id } = yield select(selectTaskPageTaskData);

  try {
    yield call(client.updateTask, id, createPayloadFromForm(form));
    yield put(editTaskSuccess());
    yield put(loadTask(id));
    history.push(`/task/${id}`);
  } catch (err) {
    yield put(editTaskError(err));
    console.log(err);
  }
}

export function* loadEditImages() {
  const { imagesUrls } = yield select(selectTaskPageEditModalForm);

  try {
    const files = yield call(client.loadImages, imagesUrls);
    yield put(updateEditModalImagesLoaded(files));
  } catch (err) {
    console.log(err);
  }
}

export default function* taskData() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(LOAD_EDIT_MODAL_IMAGES, loadEditImages);
  yield takeLatest(LOAD_TASK_OFFERS, getTaskOffers);
  yield takeLatest(ACCEPT_OFFER, acceptOffer);
  yield takeLeading(SEND_OFFER, postOffer);
  yield takeLeading(WITHDRAW_OFFER, withdrawOffer);
  yield takeLeading(CANCEL_TASK, cancelTask);
  yield takeLeading(EDIT_TASK, editTask);
}
