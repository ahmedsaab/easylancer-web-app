import { call, put, select, takeLeading, takeLatest } from 'redux-saga/effects';

import * as client from 'utils/client';

import { makeSelectCreateTaskModalFrom } from 'containers/CreateTaskModal/selectors';
import {
  taskCreateError,
  taskCreateSuccess, updateTaskModalFormGeneral,
} from 'containers/CreateTaskModal/actions';
import { FETCH_TAGS, SEND_TASK } from 'containers/CreateTaskModal/constants';
import history from 'utils/history';
import { updateModal } from 'containers/Modal/actions';

const createPayloadFromFrom = form => ({
  ...form,
  imagesUrls: form.images
    .filter(image => image.uploaded)
    .map(image => image.url),
  category: form.category.text.toLowerCase(),
  type: form.type.text.toLowerCase(),
  location: {
    address: form.address,
    country: form.location.country.long_name.toLowerCase(),
    city: form.location.city.long_name.toLowerCase(),
    geo: form.location.geo,
  },
  tags: form.tags,
});

const getTagableText = form =>
  `${form.category.text}, ${form.type.text}, ${form.title}. ${
    form.description
  }`;

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

export function* fetchTags() {
  const form = yield select(makeSelectCreateTaskModalFrom());

  try {
    const tags = yield call(client.fetchTags, getTagableText(form));
    yield put(updateTaskModalFormGeneral('tags', tags));
  } catch (err) {
    console.error(err);
  }
}

export default function* taskData() {
  yield takeLeading(SEND_TASK, postTask);
  yield takeLatest(FETCH_TAGS, fetchTags);
}
