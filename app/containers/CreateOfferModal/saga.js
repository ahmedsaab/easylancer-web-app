import { call, put, select, takeLeading } from 'redux-saga/effects';
import {
  offerSentSuccess,
  offerSentError,
} from 'containers/CreateOfferModal/actions';
import { selectTaskPageTaskData } from 'containers/TaskPage/selectors';
import { makeSelectCreateOfferModalOffer } from 'containers/CreateOfferModal/selectors';
import * as client from 'utils/client';
import { SEND_OFFER } from 'containers/CreateOfferModal/constants';
import { loadTaskOffers } from 'containers/TaskPage/actions';

export function* postOffer() {
  const { id } = yield select(selectTaskPageTaskData);
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
