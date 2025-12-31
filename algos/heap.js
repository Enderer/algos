/**
 * Create a heap that will enqueue and dequeue based on priority
 * @param {*} arr Initial list of values
 */
export const Heap = (arr = []) => {
  const context = { arr, n: arr.length };
  init(context.arr, context.n);

  return {
    enqueue: (val) => enqueue(context, val),
    dequeue: () => dequeue(context),
    size: () => context.n
  }
};

/**
 * Add a new item to the queue. Put the new value in the last
 * position then heapify up the tree to restore heap property.
 */
const enqueue = (context, val) => {
  const { arr, n } = context;
  arr[n] = val;
  pushUp(arr, n + 1, n);
  context.n += 1;
}

/**
 * Remove the highest priority item from the queue.
 * Swap the node at the top of the tree with the last one,
 * truncate the array removing that item, then heapify down
 * the tree to restore the heap property for the top node.
 */
const dequeue = (context) => {
  const { arr, n } = context;
  if (n === 0) { return undefined; }
  const val = arr[0];
  swap(arr, 0, n - 1);
  context.n -= 1;
  pushDown(arr, context.n, 0);
  return val;
}

/**
 * Initialize an array into a heap by ordering the elements
 * so that they meet the heap criteria. 
 * Start with the parent of the last node and iterate
 * in reverse heapifying the nodes until you get to the root.
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

/**
 * Restore heap property for a given node.  
 * If the smallest child is smaller than the current node
 * swap the two values.  Recursively call heapify on the
 * swapped node to restore the heap property down all
 * levels of the tree
 * @param {*} arr Array holding the tree
 * @param {*} n Number of items in the tree
 * @param {*} i Position of the node to restore
 */
export const pushDown = (arr, n, i) => {
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

/**
 * Restore heap property for a node all the way up the tree.
 * @param {*} arr Array holding the tree
 * @param {*} n Number of items in the tree
 * @param {*} i Position of the node to restore
 * @returns 
 */
export const pushUp = (arr, n, i) => {
  if (i === 0) { return; }
  n = Math.min(n, arr.length);
  i = Math.min(i, n - 1);

  const p = getParent(i);
  if (arr[i] < arr[p]) {
    [arr[i], arr[p]] = [arr[p], arr[i]];
  }
  pushUp(arr, n, p);
}

export const getLeft = (i) => (2 * i) + 1;
export const getRight = (i) => (2 * i) + 2;
export const getParent = (i) => (i - 1) >>> 1;
export const swap = (arr, i, j) => {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
};