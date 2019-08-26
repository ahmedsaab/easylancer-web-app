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
  category: form.category.text.toLowerCase(),
  type: form.type.text.toLowerCase(),
  location: {
    address: form.address,
    country: form.location.country.long_name.toLowerCase(),
    city: form.location.city.long_name.toLowerCase(),
    geo: form.location.geo,
  },
  tags: form.tags,
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
    console.error(err);
    yield put(taskCreateError(err));
  }
}

export default function* taskData() {
  yield takeLeading(SEND_TASK, postTask);
}
