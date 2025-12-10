import { describe, it } from "node:test";
import assert from "node:assert";
import { topsortDFS } from "./topsort-dfs.js";

describe("topsort-dfs", () => {

	it("returns empty ordering for an empty graph", () => {
		assert.deepEqual(topsortDFS(0, []), []);
	});

	it("handles a single isolated vertex", () => {
		assert.deepEqual(topsortDFS(1, []), [0]);
	});

	it("sorts a linear chain deterministically", () => {
		const n = 6;
		const edges = [
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 4],
			[4, 5],
		];
		const reversed = [...edges].reverse();
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2, 3, 4, 5]);
		assert.deepEqual(topsortDFS(n, reversed), [0, 1, 2, 3, 4, 5]);
	});

	it("returns ordering and ignores edges that reference negative node ids", () => {
		const n = 3;
		const edges = [
			[1, 2],
			[1, -1],
			[-2, 0],
		];
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2]);
	});

	it("places isolated vertices alongside layered DAGs", () => {
		const n = 5;
		const edges = [
			[0, 2],
			[1, 2],
			[2, 3],
		];
		const order = topsortDFS(n, edges);
		assert.deepEqual(order, [0, 1, 2, 3, 4]);
		assert.ok(order.includes(4), "isolated vertex should appear");
	});

	it("sorts multiple disconnected DAG components", () => {
		const n = 6;
		const edges = [[0, 1], [2, 3], [4, 5]];
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2, 3, 4, 5]);
	});

	it("sorts a diamond shaped DAG", () => {
		const n = 4;
		const edges = [
			[0, 1],
			[0, 2],
			[1, 3],
			[2, 3],
		];
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2, 3]);
	});

	it("handles parallel edges without breaking ordering", () => {
		const n = 3;
		const edges = [
			[0, 1],
			[0, 1],
			[1, 2],
			[1, 2],
		];
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2]);
	});

	it("does not rely on node id ordering", () => {
		const n = 5;
		const edges = [
			[4, 3],
			[4, 2],
			[3, 1],
			[2, 0],
		];
		assert.deepEqual(topsortDFS(n, edges), [4, 2, 0, 3, 1]);
	});

	it("handles high fan-out from a single source", () => {
		const n = 6;
		const edges = [
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
		];
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2, 3, 4, 5]);
	});

	it("is insensitive to the order of the edges array", () => {
		const n = 5;
		const edges = [
			[2, 3],
			[0, 1],
			[3, 4],
			[1, 2],
		];
		const shuffled = [edges[2], edges[0], edges[3], edges[1]];
		const order = topsortDFS(n, edges);
		const orderShuffled = topsortDFS(n, shuffled);
		assert.deepEqual(order, [0, 1, 2, 3, 4]);
		assert.deepEqual(orderShuffled, [0, 1, 2, 3, 4]);
	});

	it("returns [] when the graph contains a cycle", () => {
		const n = 3;
		const edges = [
			[0, 1],
			[1, 2],
			[2, 0],
		];
		assert.deepEqual(topsortDFS(n, edges), []);
	});

	it("returns [] when cycles span multiple components", () => {
		const n = 5;
		const edges = [
			[0, 1],
			[1, 2],
			[2, 3],
			[3, 1],
			[3, 4],
		];

		assert.deepEqual(topsortDFS(n, edges), []);
	});

	it("returns [] when self-loops are present even with extra edges", () => {
		const n = 2;
		const edges = [
			[0, 0],
			[0, 1],
		];
		assert.deepEqual(topsortDFS(n, edges), []);
	});

	it("returns ordering and ignores edges that reference nodes outside the graph", () => {
		const n = 3;
		const edges = [
			[0, 1],
			[1, 4],
		];
		assert.deepEqual(topsortDFS(n, edges), [0, 1, 2]);
	});
});
