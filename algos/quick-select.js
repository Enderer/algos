/**
 * Organizes the array such that the k-th smallest element is in its
 * final sorted position, with all smaller elements to its left and all
 * larger elements to its right.
 * @param {*} arr Array to partition
 * @param {*} k Number of smallest elements to position
 * @param {*} l Left index bounds
 * @param {*} r Right index bounds
 * @returns The k-th smallest element
 */
export const quickselect = (arr, k, l = 0, r = arr.length - 1) => {
  k = Math.min(k, arr.length);
  k = Math.max(k, 0);
  if (k === 0) {
    return;
  }
  const target = k - 1;
  const p = partition(arr, l, r);

  if (p === target) {
    return arr[p];
  }
  if (p > target) {
    return quickselect(arr, k, l, p - 1);
  }
  if (p < target) {
    return quickselect(arr, k, p + 1, r);
  }
  throw new Error(`Invalid p:${p} target:${target}`);
}

/**
 * Partitions the array in-place around a pivot such that all elements less
 * than the pivot are to its left and all elements greater than or equal to
 * the pivot are to its right.
 * @param {*} arr Array to partition
 * @param {*} l Left index bounds
 * @param {*} r Right index bounds
 * @returns The final index of the pivot
*/
export const partition = (arr, l, r) => {
  if (l === r) {
    return l;
  }

  let i = l;
  let j = r - 1;
  const p = r;
  const pivot = arr[p];

  while (i <= j) {
    if (arr[i] < pivot) {
      i++;
    } else if (arr[j] >= pivot) {
      j--;
    } else {
      swap(arr, i, j);
      j--;
    }
  }
  swap(arr, i, p);
  return i;
};

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
