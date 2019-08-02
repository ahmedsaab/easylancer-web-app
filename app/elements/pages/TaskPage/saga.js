import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TASK, LOAD_TASK_OFFERS } from 'elements/pages/TaskPage/constants';
import {
  taskLoaded,
  taskLoadingError,
  taskOffersLoaded,
  taskOffersLoadingError,
} from 'elements/pages/TaskPage/actions';
import { makeSelectTaskPageId } from 'elements/pages/TaskPage/selectors';
import * as client from 'utils/client';
import {
  updateOfferModalPayment,
  updateOfferModalPrice,
} from 'elements/pages/CreateOfferModal/actions';
import { viewOffer } from 'elements/pages/OfferDetailsModal/actions';
import { offerUrlRegex } from 'elements/pages/OfferDetailsModal';

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
    const offers = yield call(client.getTaskOffers, id);
    yield put(taskOffersLoaded(offers));
    // eslint-disable-next-line no-restricted-globals
    if (offerUrlRegex.test(location.pathname)) {
      yield put(
        viewOffer(
          // eslint-disable-next-line no-restricted-globals
          offers.find(offer => offer.id === location.pathname.split('/').pop()),
        ),
      );
    }
  } catch (err) {
    yield put(taskOffersLoadingError(err));
  }
}

export default function* taskData() {
  yield takeLatest(LOAD_TASK, getTask);
  yield takeLatest(LOAD_TASK_OFFERS, getTaskOffers);
}
