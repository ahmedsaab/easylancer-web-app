import { takeLeading, call, put } from 'redux-saga/effects';
import * as client from 'utils/client';
import { myTasksLoaded, myTasksLoadingError } from './actions';
import { LOAD_MY_TASKS } from './constants';

export function* getMyTasks() {
  try {
    const data = yield call(client.getMyTasks);
    yield put(myTasksLoaded(data));
  } catch (err) {
    yield put(myTasksLoadingError(err));
    console.log(err);
  }
}

export default function* myTasksPageSaga() {
  yield takeLeading(LOAD_MY_TASKS, getMyTasks);
}
