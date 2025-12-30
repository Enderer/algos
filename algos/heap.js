/**
 * Initialize an array into a heap by ordering the elements
 * so that they meet the heap criteria
 * @param {*} arr Array to be heapified
 * @param {*} n Number of elements in the array
 */
export const init = (arr, n = arr.length) => {
  if (n <= 1) return arr;

  n = Math.min(n, arr.length);
  const last = getParent(n - 1);
  for (let i = last; i >= 0; i--) {
    pushDown(arr, n, i);
  }
  return arr;
};

const getLeft = (i) => (2 * i) + 1;
const getRight = (i) => (2 * i) + 2;
const getParent = (i) => (i - 1) >>> 1;

/**
 * Restore heap property for a given node.  
 * @param {*} arr Array holding the tree
 * @param {*} n Number of items in the tree
 * @param {*} i Position of the node to restore
 */
const pushDown = (arr, n, i) => {
  let s = i;

  const l = getLeft(i);
  if (l < n && arr[l] < arr[s]) {
    s = l;
  }

  const r = getRight(i);
  if (r < n && arr[r] < arr[s]) {
    s = r;
  }
  if (s === i) {
    return;
  }
  [arr[s], arr[i]] = [arr[i], arr[s]];
  pushDown(arr, n, s);
};
