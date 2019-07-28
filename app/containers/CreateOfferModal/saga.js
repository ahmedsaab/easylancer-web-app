import { call, put, select, takeLeading } from 'redux-saga/effects';
import {
  offerSentSuccess,
  offerSentError,
} from 'containers/CreateOfferModal/actions';
import { makeSelectTaskPageId } from 'containers/TaskPage/selectors';
import { makeSelectCreateOfferModalOffer } from 'containers/CreateOfferModal/selectors';
import * as client from 'utils/client';
import { SEND_OFFER } from './constants';

export function* postOffer() {
  const id = yield select(makeSelectTaskPageId());
  const offer = yield select(makeSelectCreateOfferModalOffer());

  try {
    yield call(client.postOffer, id, offer);
    yield put(offerSentSuccess());
  } catch (err) {
    yield put(offerSentError(err));
  }
}

export default function* taskData() {
  yield takeLeading(SEND_OFFER, postOffer);
}
