import { call, put, select, takeLeading } from 'redux-saga/effects';

import * as client from 'utils/client';

import { makeSelectCreateTaskModalFrom } from 'containers/CreateTaskModal/selectors';
import {
  taskCreateError,
  taskCreateSuccess,
} from 'containers/CreateTaskModal/actions';
import { SEND_TASK } from 'containers/CreateTaskModal/constants';
import history from 'utils/history';
import { updateModal } from 'containers/Modal/actions';
import moment from 'moment';

const createPayloadFromFrom = form => ({
  ...form,
  date: undefined,
  time: undefined,
  category: form.category.toLowerCase(),
  type: form.type.toLowerCase(),
  country: form.country.toLowerCase(),
  city: form.city.toLowerCase(),
  startDateTime: moment(form.time.toLowerCase(), 'hh:mma')
    .set('year', form.date.getFullYear())
    .set('month', form.date.getMonth())
    .set('date', form.date.getDate())
    .toISOString(),
});

export function* postTask() {
  const form = yield select(makeSelectCreateTaskModalFrom());

  try {
    const task = yield call(client.postTask, createPayloadFromFrom(form));
    yield put(taskCreateSuccess());
    yield put(updateModal(null));
    history.push(`/task/${task.id}`);
  } catch (err) {
    yield put(taskCreateError(err));
  }
}

export default function* taskData() {
  yield takeLeading(SEND_TASK, postTask);
}
