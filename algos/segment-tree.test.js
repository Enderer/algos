
import { describe, it } from "node:test";
import assert from "node:assert";
import { SegmentTree } from './segment-tree.js';

describe("segment-tree", () => {
  it("sums segments", () => {
    const n = 10;
    const nums = new Array(n).fill(1);
    const segment = SegmentTree(nums);
    assert.equal(segment.query(0, 0), 1);
    assert.equal(segment.query(0, 1), 2);
    assert.equal(segment.query(1, 6), 6);
  });

  it("sums all segments", () => {
    const n = 5;
    const nums = Array.from({ length: n }, (_, i) => i);
    const segment = SegmentTree(nums);
    const ranges = [];
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        ranges.push([i, j]);
      }
    }
    const results = ranges.map(([i, j]) => segment.query(i, j));
    assert.deepEqual(results, [0, 1, 3, 6, 10, 1, 3, 6, 10, 2, 5, 9, 3, 7, 4]);
  });

  it("handles length 1", () => {
    const segment = SegmentTree([1]);
    assert.equal(segment.query(0, 0), 1);
  });

  it("updates single elements", () => {
    const segment = SegmentTree([1, 1, 1, 1, 1]);
    const ranges = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];
    const sums = ranges.map(([r0, r1]) => segment.query(r0, r1));
    assert.deepEqual(sums, [1, 2, 3, 4, 5]);
    segment.update(2, 10);
    const sums1 = ranges.map(([r0, r1]) => segment.query(r0, r1));
    assert.deepEqual(sums1, [1, 2, 12, 13, 14]);
  });
});
