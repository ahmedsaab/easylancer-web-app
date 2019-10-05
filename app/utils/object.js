export function arrayToCsv(array) {
  return array.join(' - ');
}

export function clean(pojo) {
  return Object.keys(pojo).reduce((object, key) => {
    if (key !== undefined) {
      // eslint-disable-next-line no-param-reassign
      object[key] = pojo[key];
    }
    return object;
  }, {});
}
