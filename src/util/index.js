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

export const ellipses = (c, m) => {
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

export const firstUpper = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
};

export const setPageIndexes = pages => {
  const total = Math.ceil(pages.posts.length / 4) + 1;
  let page = 1;
  let beginSlice = 0;
  let endSlice = 4;

  while (page < total) {
    pages[page] = pages.posts.slice(beginSlice, endSlice);
    pages.totalPages = page;

    beginSlice = beginSlice + 4;
    endSlice = endSlice + 4;
    page++;
  }

  return pages;
};
