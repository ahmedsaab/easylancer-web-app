import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TASKS } from 'containers/SearchPage/constants';
import { tasksLoaded, tasksLoadingError } from 'containers/SearchPage/actions';
import { makeSelectSearchFilters } from 'containers/SearchPage/selectors';
import * as client from 'utils/client';

export function* getTasks() {
  const filters = yield select(makeSelectSearchFilters());

  try {
    const response = yield call(client.searchTasks, filters);
    yield put(tasksLoaded(response));
  } catch (err) {
    yield put(tasksLoadingError(err));
  }
}

export default function* tasksData() {
  yield takeLatest(LOAD_TASKS, getTasks);
}
