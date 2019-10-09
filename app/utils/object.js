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

export function equal(object1, object2) {
  return JSON.stringify(object1) === JSON.stringify(object2);
}
