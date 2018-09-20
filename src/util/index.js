export const associateFilter = ({ haystack, hayProp, needle, needleProp }) => {
  const arr = [];

  haystack.filter(haySingle => {
    return needle.filter(needleSingle => {
      if (needleProp) {
        return needleSingle[needleProp].filter(value => {
          if (haySingle.id === value) {
            return arr.push(haySingle);
          }

          return null;
        });
      } else if (hayProp) {
        return haySingle[hayProp].forEach(value => {
          if (needleSingle.id === value) {
            return arr.push(haySingle);
          }

          return null;
        });
      } else {
        return null;
      }
    });
  });

  return arr;
};

export const unique = arr => {
  let obj = {};
  return Object.keys(
    arr.reduce((prev, next) => {
      if (!obj[next.id]) obj[next.id] = next;
      return obj;
    }, obj)
  ).map(i => obj[i]);
};
