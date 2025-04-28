/**
 * Segment Tree - Range Sum Query (RQM)
 * @param {number[]} nums
 */
export const SegmentTree = (nums) => {
    const nodes = new Array(4 * nums.length);
    init(nums, nodes, 0, 0, nums.length - 1);
    return {
        query: (l, r) => query(nodes, l, r, 0),
        update: (n, v) => update(nodes, n, v)
    };
}

const init = (nums, nodes, i, l, r) => {
    const m = mid(l, r);
    nodes[i] = { l, r, m, sum: nums[l] };
    if (l === r) { return nodes[i].sum; }
    const leftSum = init(nums, nodes, leftChild(i), l, m);
    const rightSum = init(nums, nodes, rightChild(i), m + 1, r);
    const sum = leftSum + rightSum;
    nodes[i].sum = sum;
    return sum;
}

const query = (nodes, l, r, i) => {
    const node = nodes[i];

    if (node.l === l && node.r === r) {
        return node.sum;
    }
    if (r <= node.m) {
        return query(nodes, l, r, leftChild(i));
    }
    if (l > node.m) {
        return query(nodes, l, r, rightChild(i));
    }
    const leftSum = query(nodes, l, node.m, leftChild(i));
    const rightSum = query(nodes, node.m + 1, r, rightChild(i));
    return leftSum + rightSum;
}

const update = (nodes, n, val, i = 0) => {
    const node = nodes[i];
    if (node.l === n && node.r === n) {
        const delta = val - node.sum;
        node.sum = val;
        return delta;
    } else if (n <= node.m) {
        const child = leftChild(i);
        const delta = update(nodes, n, val, child);
        node.sum += delta;
        return delta;
    } else {
        const child = rightChild(i);
        const delta = update(nodes, n, val, child);
        node.sum += delta;
        return delta;
    }
}

const leftChild = (i) => (2 * i) + 1;

const rightChild = (i) => (2 * i) + 2;

const mid = (l, r) => l + ((r - l) >> 1);
