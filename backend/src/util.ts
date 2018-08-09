function _first<T>(
  items: T[],
  predicate: (item: T) => boolean,
  defaultItem: T = undefined
) {
  const filtered = items.filter(predicate);
  if (filtered && Array.isArray(filtered) && filtered.length > 0) {
    return filtered[0];
  } else {
    return defaultItem;
  }
}

const _union = (listA: string[], listB: string[]) => {
  const dict = {};
  const add = (d, v) => {
    if (v && !d[v]) {
      d[v] = true;
    }
  };
  listA.forEach(a => add(dict, a));
  listB.forEach(b => add(dict, b));
  return Object.keys(dict);
};

const DATED_CACHE = (cacheName: string, date: string) => {
  return `${cacheName}${date ? `.${date}` : ""}`;
};

export { _first, _union, DATED_CACHE };
