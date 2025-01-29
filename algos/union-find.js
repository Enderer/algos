/**
 * Union Find
 * O()
 * @param {number} n Number of starting sets
 */
export const UnionFind = (n) => {

  const sets = Array.from({ length: n }, (_, i) => i);
  const sizes = new Array(n).fill(1);
  let count = n;

  const find = (i) => {
    while (sets[i] !== i) {
      sets[i] = sets[sets[i]];
      i = sets[i];
    }
    return i;
  }

  const union = (a, b) => {
    const pA = find(a);
    const pB = find(b);
    if (pA === pB) {
      return false;
    }
    if (sizes[pA] < sizes[pB]) {
      [pA, pB] = [pB, pA];
    }
    sets[pB] = pA;
    sizes[pA] += sizes[pB];
    sizes[pB] = 0;
    count -= 1;
    return true;
  }

  return { union, find };

};
