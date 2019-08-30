import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import {
  LOAD_TASK,
  LOAD_TASK_OFFERS,
  ACCEPT_OFFER,
  SEND_OFFER,
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
} from 'containers/TaskPage/actions';
import * as client from 'utils/client';

import history from 'utils/history';
import { makeSelectGlobalLocation } from 'containers/App/selectors';
import {
  selectTaskPageTaskData,
  selectTaskPageOfferFormData,
} from 'containers/TaskPage/selectors';

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
    history.push(`/task/${id}/offers`);
  } catch (err) {
    yield put(offerSentError(err));
  }
}

export default function* taskData() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(LOAD_TASK_OFFERS, getTaskOffers);
  yield takeLatest(ACCEPT_OFFER, acceptOffer);
  yield takeLeading(SEND_OFFER, postOffer);
}
