export const associateFilter = ({ filterBy, group, groupProp }) => {
  const arr = [];

  filterBy.forEach(idSingle => {
    group.forEach(groupSingle => {
      groupSingle[groupProp].forEach(
        value => idSingle.id === value && arr.push(groupSingle)
      );
    });
  });

  return arr;
};

export const firstUpper = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
};

export const pagination = (c, m) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);

  for (let i = c - delta; i <= c + delta; i++) {
    if (i < m && i > 1) {
      range.push(i);
    }
  }

  range.push(m);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(i);

    l = i;
  }

  return rangeWithDots;
};
