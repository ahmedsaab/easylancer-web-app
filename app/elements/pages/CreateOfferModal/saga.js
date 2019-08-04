import { call, put, select, takeLeading } from 'redux-saga/effects';
import {
  offerSentSuccess,
  offerSentError,
} from 'elements/pages/CreateOfferModal/actions';
import { makeSelectTaskPageId } from 'elements/pages/TaskPage/selectors';
import { makeSelectCreateOfferModalOffer } from 'elements/pages/CreateOfferModal/selectors';
import * as client from 'utils/client';
import { SEND_OFFER } from 'elements/pages/CreateOfferModal/constants';
import { loadTaskOffers } from 'elements/pages/TaskPage/actions';

export function* postOffer() {
  const id = yield select(makeSelectTaskPageId());
  const offer = yield select(makeSelectCreateOfferModalOffer());

  try {
    yield call(client.postOffer, id, offer);
    yield put(offerSentSuccess());
    yield put(loadTaskOffers(id));
  } catch (err) {
    yield put(offerSentError(err));
  }
}

export default function* taskData() {
  yield takeLeading(SEND_OFFER, postOffer);
}
