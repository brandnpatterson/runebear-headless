export const associateFilter = ({ haystack, hayProp, needle, needleProp }) => {
  const arr = [];

  haystack &&
    haystack.forEach(haySingle => {
      needle &&
        needle.forEach(needleSingle => {
          if (needleProp) {
            needleSingle[needleProp].forEach(
              value => haySingle.id === value && arr.push(haySingle)
            );
          } else if (hayProp) {
            haySingle[hayProp].forEach(
              value => needleSingle.id === value && arr.push(haySingle)
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
