export const unique = arr => {
  let obj = {};
  return Object.keys(
    arr.reduce((prev, next) => {
      if (!obj[next.id]) obj[next.id] = next;
      return obj;
    }, obj)
  ).map(i => obj[i]);
};
