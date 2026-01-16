import { describe, it } from "node:test";
import assert from "node:assert";
import { dijkstras } from "./dijkstras.js";

describe("dijkstras", () => {
  it("returns predecessor and distance for a simple directed graph", () => {
    const edges = [
      [0, 1, 2],
      [1, 2, 1],
      [0, 2, 5],
      [2, 3, 2],
      [1, 3, 6],
    ];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result, new Map([
      [0, [0, 0]],
      [1, [0, 2]],
      [2, [1, 3]],
      [3, [2, 5]],
    ]));
  });

  it("excludes nodes that are unreachable from the source", () => {
    const edges = [
      [0, 1, 4],
      [1, 2, 3],
    ];
    const result = dijkstras(edges, 0);
    assert.equal(result.has(0), true);
    assert.equal(result.has(1), true);
    assert.equal(result.has(2), true);
    assert.equal(result.has(3), false);
    assert.equal(result.has(4), false);
  });

  it("picks the cheaper route when a direct edge is more expensive", () => {
    const edges = [
      [0, 1, 1],
      [1, 2, 1],
      [0, 2, 10],
    ];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result.get(2), [1, 2]);
  });

  it("handles cycles without revisiting settled nodes", () => {
    const edges = [
      [0, 1, 1],
      [1, 2, 1],
      [2, 0, 1],
      [2, 3, 1],
    ];

    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result.get(3), [2, 3]);
  });

  it("computes shortest paths in an undirected graph when edges are duplicated both ways", () => {
    const edges = [
      [0, 1, 2], [1, 0, 2],
      [1, 2, 1], [2, 1, 1],
      [0, 2, 5], [2, 0, 5],
    ];

    const result = dijkstras(edges, 0);

    assert.deepStrictEqual(result.get(0), [0, 0]);
    assert.deepStrictEqual(result.get(1), [0, 2]);
    assert.deepStrictEqual(result.get(2), [1, 3]);
  });

  it("returns only the source for a single-node graph", () => {
    const edges = [];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result, new Map([[0, [0, 0]]]));
  });

  it("only includes the source when no edges exist in a multi-node graph", () => {
    const edges = [];
    const result = dijkstras(edges, 1);
    assert.equal(result.has(1), true);
    assert.equal(result.has(0), false);
    assert.equal(result.has(2), false);
  });

  it("chooses the cheapest among parallel edges", () => {
    const edges = [
      [0, 1, 5],
      [0, 1, 2],
      [1, 2, 3],
    ];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result.get(1), [0, 2]);
    assert.deepStrictEqual(result.get(2), [1, 5]);
  });

  it("handles zero-weight edges", () => {
    const edges = [
      [0, 1, 0],
      [1, 2, 0],
      [0, 2, 5],
    ];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result.get(2), [1, 0]);
  });

  it("ignores self-loops that do not improve distance", () => {
    const edges = [
      [0, 0, 10],
      [0, 1, 1],
      [1, 1, 5],
      [1, 2, 2],
    ];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result.get(2), [1, 3]);
  });

  it("is deterministic with equal-cost alternative paths", () => {
    const edges = [
      [0, 1, 1],
      [1, 3, 2],
      [0, 2, 1],
      [2, 3, 2],
    ];
    const result = dijkstras(edges, 0);
    assert.deepStrictEqual(result.get(3), [1, 3]);
  });
});
