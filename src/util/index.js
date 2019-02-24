export function ellipses(c, m) {
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

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(i);

    l = i;
  });

  return rangeWithDots;
}

export function firstUpper(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(' ');
}

export function decodeHtml(string) {
  var el = document.createElement('div');
  el.innerHTML = string;
  return el.innerHTML;
}
