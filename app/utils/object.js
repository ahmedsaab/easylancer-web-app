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

export function getMaxMatchingString(strings, test) {
  let maxMatchedCount = 0;
  let activeTab = null;

  strings.forEach(string => {
    const matched = test.match(new RegExp(string, 'g'));
    const matchedCount = matched ? matched[0].length : 0;

    if (matchedCount > maxMatchedCount) {
      activeTab = string;
      maxMatchedCount = matchedCount;
    }
  });

  return activeTab;
}
