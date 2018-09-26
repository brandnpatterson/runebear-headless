export const associateFilter = ({ group, groupProp, id, idProp }) => {
  const arr = [];

  group &&
    group.forEach(groupSingle => {
      id &&
        id.forEach(idSingle => {
          if (idProp) {
            idSingle[idProp].forEach(
              value => groupSingle.id === value && arr.push(groupSingle)
            );
          } else if (groupProp) {
            groupSingle[groupProp].forEach(
              value => idSingle.id === value && arr.push(groupSingle)
            );
          }
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
