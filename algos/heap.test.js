import { describe, it } from "node:test";
import assert from "node:assert";
import { Heap, init } from "./heap.js";

describe("Heap", () => {

  it("builds a heap and dequeues all items", () => {
    const heap = Heap();
    heap.enqueue(5);
    heap.enqueue(4);
    heap.enqueue(3);
    heap.enqueue(2);
    heap.enqueue(1);
    assert.equal(heap.size(), 5);
    assert.equal(heap.dequeue(), 1);
    assert.equal(heap.dequeue(), 2);
    assert.equal(heap.dequeue(), 3);
    assert.equal(heap.dequeue(), 4);
    assert.equal(heap.dequeue(), 5);
    assert.equal(heap.size(), 0);
  });

  it("Inits a heap and dequeues all items", () => {
    const heap = Heap([5, 4, 3, 2, 1]);
    assert.equal(heap.dequeue(), 1);
    assert.equal(heap.dequeue(), 2);
    assert.equal(heap.dequeue(), 3);
    assert.equal(heap.dequeue(), 4);
    assert.equal(heap.dequeue(), 5);
    assert.equal(heap.size(), 0);
  });
});

describe("init", () => {

	it("builds a min-heap for the whole array in one pass", () => {
		const arr = [3, 9, 8, 4, 5, 7, 6];
		init(arr, arr.length);
	  assert.deepEqual(arr, [3, 4, 6, 9, 5, 7, 8]);
	});

	it("handles duplicates while building the heap", () => {
		const arr = [5, 1, 5, 3, 5, 2, 1];
		init(arr);
		assert.deepEqual(arr, [1, 3, 1, 5, 5, 2, 5]);
	});

	it("is a no-op for arrays of length 0 or 1", () => {
		const empty = [];
		init(empty, empty.length);
		assert.deepEqual(empty, []);

		const single = [42];
		init(single, single.length);
		assert.deepEqual(single, [42]);
	});

	it("only heapifies the first n elements", () => {
		const arr = [5, 4, 3, 2];
		init(arr, 3);
		assert.deepEqual(arr, [3, 4, 5, 2]);
	});
});
