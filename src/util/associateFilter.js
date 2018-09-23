export const associateFilter = ({ haystack, hayProp, needle, needleProp }) => {
  const arr = [];

  haystack.forEach(haySingle => {
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
