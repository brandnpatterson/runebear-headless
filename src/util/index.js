export const associateFilter = ({ filterBy, group, groupProp }) => {
  const arr = [];

  group &&
    group.forEach(groupSingle => {
      filterBy &&
        filterBy.forEach(filterBySingle => {
          groupSingle[groupProp].forEach(
            value => filterBySingle.filterBy === value && arr.push(groupSingle)
          );
        });
    });

  return arr;
};

export const firstLetterUpper = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
};
