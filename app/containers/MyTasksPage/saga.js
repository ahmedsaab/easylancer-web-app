import { takeLeading, call, put } from 'redux-saga/effects';
import * as client from 'utils/client';
import { myTasksLoaded, myTasksLoadingError } from './actions';
import { LOAD_MY_TASKS } from './constants';

export function* getMyTasks({ list, page }) {
  try {
    const data = yield call(client.getMyTasks, list, page);

    yield put(
      myTasksLoaded(list, {
        hasNext: data.totalPages > data.pageNo,
        data: data.page,
        page: data.pageNo,
      }),
    );
  } catch (err) {
    yield put(myTasksLoadingError(list, err));
    console.error(err);
  }
}

export default function* myTasksPageSaga() {
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedNew',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedHistory',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedScheduled',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedStarted',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) =>
      type === LOAD_MY_TASKS && list === 'appliedPendingWorker',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedDone',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedNotDone',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedInvestigate',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) =>
      type === LOAD_MY_TASKS && list === 'appliedPendingOwner',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'appliedCancelled',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdOpen',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdScheduled',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdStarted',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) =>
      type === LOAD_MY_TASKS && list === 'createdPendingWorker',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdDone',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdNotDone',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdInvestigate',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) =>
      type === LOAD_MY_TASKS && list === 'createdPendingOwner',
    getMyTasks,
  );
  yield takeLeading(
    ({ type, list }) => type === LOAD_MY_TASKS && list === 'createdCancelled',
    getMyTasks,
  );
}
