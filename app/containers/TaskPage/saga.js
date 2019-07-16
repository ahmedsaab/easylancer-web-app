import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TASK } from 'containers/TaskPage/constants';
import { taskLoaded, taskLoadingError } from 'containers/TaskPage/actions';
import { makeSelectTaskPageId } from 'containers/TaskPage/selectors';
import * as client from 'utils/client';

export function* getTask() {
  const id = yield select(makeSelectTaskPageId());

  try {
    const task = yield call(client.getTask, id);
    yield put(taskLoaded(task));
  } catch (err) {
    yield put(taskLoadingError(err));
  }
}

export default function* taskData() {
  yield takeLatest(LOAD_TASK, getTask);
}
