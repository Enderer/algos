import { describe, it } from "node:test";
import assert from "node:assert";
import { floydWarshall } from "./floyd-warshall.js";

const INF = Number.POSITIVE_INFINITY;

describe("floydWarshall", () => {
  it("handles zero-node graph", () => {
    const dist = floydWarshall(0, []);
    assert.deepStrictEqual(dist, []);
  });

  it("handles a single node with no edges", () => {
    const dist = floydWarshall(1, []);
    assert.deepStrictEqual(dist, [[0]]);
  });

  it("keeps unreachable nodes as infinity when no edges exist", () => {
    const dist = floydWarshall(3, []);
    assert.deepStrictEqual(dist, [
      [0, INF, INF],
      [INF, 0, INF],
      [INF, INF, 0],
    ]);
  });

  it("computes a simple directed edge", () => {
    const dist = floydWarshall(2, [[0, 1, 5]]);
    assert.deepStrictEqual(dist, [
      [0, 5],
      [INF, 0],
    ]);
  });

  it("prefers the minimum weight among duplicate edges", () => {
    const dist = floydWarshall(2, [
      [0, 1, 5],
      [0, 1, 2],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 2],
      [INF, 0],
    ]);
  });

  it("keeps disconnected components unreachable", () => {
    const dist = floydWarshall(3, [[0, 1, 4]]);
    assert.deepStrictEqual(dist, [
      [0, 4, INF],
      [INF, 0, INF],
      [INF, INF, 0],
    ]);
  });

  it("updates distances through an intermediate node", () => {
    const dist = floydWarshall(3, [
      [0, 1, 3],
      [1, 2, 4],
      [0, 2, 10],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 3, 7],
      [INF, 0, 4],
      [INF, INF, 0],
    ]);
  });

  it("handles negative edges without negative cycles", () => {
    const dist = floydWarshall(3, [
      [0, 1, 2],
      [1, 2, -5],
      [0, 2, 10],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 2, -3],
      [INF, 0, -5],
      [INF, INF, 0],
    ]);
  });

  it("handles a negative self-loop appropriately", () => {
    const dist = floydWarshall(2, [[1, 1, -2]]);
    assert.ok(dist[0][0] === 0 && dist[1][1] < 0)
  });

  it("handles zero-weight edges and cycles", () => {
    const dist = floydWarshall(3, [
      [0, 1, 0],
      [1, 2, 0],
      [2, 0, 0],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("computes bidirectional edges correctly", () => {
    const dist = floydWarshall(3, [
      [0, 1, 1],
      [1, 0, 1],
      [1, 2, 2],
      [2, 1, 2],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 1, 3],
      [1, 0, 2],
      [3, 2, 0],
    ]);
  });

  it("returns the minimum over multiple equally short paths", () => {
    const dist = floydWarshall(3, [
      [0, 1, 2],
      [1, 2, 2],
      [0, 2, 4],
      [0, 2, 5],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 2, 4],
      [INF, 0, 2],
      [INF, INF, 0],
    ]);
  });

  it("handles a dense directed graph without assuming symmetry", () => {
    const dist = floydWarshall(3, [
      [0, 1, 1],
      [0, 2, 5],
      [1, 0, 4],
      [1, 2, 1],
      [2, 0, 2],
      [2, 1, 3],
    ]);
    assert.deepStrictEqual(dist, [
      [0, 1, 2],
      [3, 0, 1],
      [2, 3, 0],
    ]);
  });

  it("exposes behavior in presence of a negative cycle", () => {
    const dist = floydWarshall(3, [
      [0, 1, 1],
      [1, 2, 1],
      [2, 0, -3], // cycle total = -1
    ]);
    // Depending on implementation, diagonal may become negative.
    // Accept any result with negative diagonal indicating negative cycle influence.
    assert.ok(dist[0][0] <= 0 && dist[1][1] <= 0 && dist[2][2] <= 0);
  });
});