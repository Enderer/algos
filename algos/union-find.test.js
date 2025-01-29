import { describe, it, expect } from "vitest";
import { UnionFind } from './union-find';

describe("sample test", () => {
  it("returns true", () => {
    const n = 10;
    const uf = UnionFind(n);
    const list = [...new Array(n - 1)];
    list.forEach((_, i) => uf.union(i, i + 1));
    const ids = list.map((_, i) => uf.find(i));
    expect(ids).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
