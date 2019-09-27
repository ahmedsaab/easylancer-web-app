import moment from 'moment';

export function formatTaskStartDateTime(startDateTime) {
  return moment
    .utc(startDateTime)
    .local()
    .format('MMM D, YYYY [at] h:mm A z');
}

export function formatTaskCreatedAt(createdAt) {
  return moment
    .utc(createdAt)
    .local()
    .format('MMM D, YYYY');
}

export function formatProfileCreatedAtDate(createdAt) {
  return moment
    .utc(createdAt)
    .local()
    .format('MMM D, YYYY');
}
