
import { describe, it } from "node:test";
import assert from "node:assert";
import { UnionFind } from './union-find.js';

describe("union-find", () => {
  it("joins all sets", () => {
    const n = 10;
    const uf = UnionFind(n);
    const list = [...new Array(n - 1)];
    list.forEach((_, i) => uf.union(i, i + 1));
    const ids = list.map((_, i) => uf.find(i));
    assert.deepEqual(ids, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
