import { ACCEPT_OFFER } from 'elements/pages/OfferDetailsModal/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectTaskPageId } from 'elements/pages/TaskPage/selectors';
import * as client from 'utils/client';
import {
  acceptOfferSuccess,
  acceptOfferError,
} from 'elements/pages/OfferDetailsModal/actions';
import { makeSelectOfferDetailsOffer } from 'elements/pages/OfferDetailsModal/selectors';

export function* acceptOffer() {
  const taskId = yield select(makeSelectTaskPageId());
  const offer = yield select(makeSelectOfferDetailsOffer());

  try {
    yield call(client.acceptOffer, taskId, offer.id);
    yield put(acceptOfferSuccess());
  } catch (err) {
    yield put(acceptOfferError(err));
  }
}

export default function* offerDetailsModalSaga() {
  yield takeLatest(ACCEPT_OFFER, acceptOffer);
}
