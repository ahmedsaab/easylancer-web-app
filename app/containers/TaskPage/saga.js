import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TASK, LOAD_TASK_OFFERS } from 'containers/TaskPage/constants';
import {
  taskLoaded,
  taskLoadingError,
  taskOffersLoaded,
  taskOffersLoadingError,
} from 'containers/TaskPage/actions';
import { makeSelectTaskPageId } from 'containers/TaskPage/selectors';
import * as client from 'utils/client';
import {
  updateOfferModalPayment,
  updateOfferModalPrice,
} from 'containers/CreateOfferModal/actions';

export function* getTask() {
  const id = yield select(makeSelectTaskPageId());

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
  const id = yield select(makeSelectTaskPageId());

  try {
    const task = yield call(client.getTaskOffers, id);
    yield put(taskOffersLoaded(task));
  } catch (err) {
    yield put(taskOffersLoadingError(err));
  }
}

export default function* taskData() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(LOAD_TASK_OFFERS, getTaskOffers);
}
