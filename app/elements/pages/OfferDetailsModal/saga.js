import { ACCEPT_OFFER } from 'elements/pages/OfferDetailsModal/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectTaskPageId } from 'elements/pages/TaskPage/selectors';
import * as client from 'utils/client';
import {
  acceptOfferSuccess,
  acceptOfferError,
} from 'elements/pages/OfferDetailsModal/actions';
import { makeSelectOfferDetailsOffer } from 'elements/pages/OfferDetailsModal/selectors';
import { updateModal } from 'elements/pages/Modal/actions';
import { loadTaskOffers } from 'elements/pages/TaskPage/actions';
import history from 'utils/history';

export function* acceptOffer() {
  const taskId = yield select(makeSelectTaskPageId());
  const offer = yield select(makeSelectOfferDetailsOffer());

  try {
    yield call(client.acceptOffer, taskId, offer.id);
    yield put(acceptOfferSuccess());
    yield put(loadTaskOffers());

    history.push(`/task/${taskId}/offers/`);
  } catch (err) {
    yield put(acceptOfferError(err));
  } finally {
    yield put(updateModal('task-assigned-confirmation'));
  }
}

export default function* offerDetailsModalSaga() {
  yield takeLatest(ACCEPT_OFFER, acceptOffer);
}
