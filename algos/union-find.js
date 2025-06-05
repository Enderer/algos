/**
 * Union Find
 * @param {number} n Number of starting sets
 */
export const UnionFind = (n) => {
  const sets = Array.from({ length: n }, (_, i) => i);
  const sizes = new Array(n).fill(1);
  return {
    union: (a, b) => union(sizes, sets, a, b),
    find: (a) => find(sets, a)
  };
};

export const find = (sets, i) => {
  while (sets[i] !== i) {
    sets[i] = sets[sets[i]];
    i = sets[i];
  }
  return i;
};

export const union = (sizes, sets, a, b) => {
  const pA = find(sets, a);
  const pB = find(sets, b);
  if (pA === pB) {
    return false;
  }
  if (sizes[pA] < sizes[pB]) {
    [pA, pB] = [pB, pA];
  }
  sets[pB] = pA;
  sizes[pA] += sizes[pB];
  sizes[pB] = 0;
  return true;
};
