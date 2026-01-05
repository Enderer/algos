import { describe, it } from "node:test";
import assert from "node:assert";
import { quickselect } from "./quick-select.js";

const expectPartitioned = (arr, k) => {
	const sorted = [...arr].sort((a, b) => a - b);
	if (k === 0) {
		assert.deepEqual(arr, sorted, "k=0 should leave array sorted equivalently");
		return;
	}

	const pivotIndex = k - 1;
	const pivot = sorted[pivotIndex];
	const left = arr.slice(0, k).sort((a, b) => a - b);
	const right = arr.slice(k);

	assert.equal(arr[pivotIndex], pivot, "pivot position should hold kth smallest");
	assert.deepEqual(left, sorted.slice(0, k), "first k elements should be the k smallest (order-agnostic)");
	for (let i = 0; i < k; i++) {
		assert.ok(arr[i] <= pivot, `index ${i} on the left exceeds pivot`);
	}
	for (let i = 0; i < right.length; i++) {
		assert.ok(right[i] >= pivot, `index ${k + i} on the right is below pivot`);
	}
};

describe("quickselect", () => {
		it("places the kth smallest in position with smaller elements to the left", () => {
			const arr = [9, 1, 5, 3, 7, 6, 2];
			const k = 3;
			const val = quickselect(arr, k);
			expectPartitioned(arr, k);
			assert.equal(val, 3);
		});

		it("handles duplicates while partitioning", () => {
			const arr = [4, 1, 4, 2, 4, 3];
			const k = 2;
			const val = quickselect(arr, k);
			expectPartitioned(arr, k);
			assert.equal(val, 2);
		});

		it("works with negatives and selects the minimum at k=0", () => {
				const arr = [0, -2, 5, -1, 4];
				const val = quickselect(arr, 1);
				expectPartitioned(arr, 1);
				assert.equal(val, -2);
		});

		it("handles an empty array without crashing", () => {
			const arr = [];
			const val = quickselect(arr, 0);
			assert.equal(val, undefined);
			assert.deepEqual(arr, []);
		});

		it("returns the only element when array length is 1", () => {
			const arr = [7];
			const val = quickselect(arr, 1);
			expectPartitioned(arr, 1);
			assert.equal(val, 7);
		});

		it("selects the maximum when k is the last index", () => {
			const arr = [8, 5, 9, 1];
			const val = quickselect(arr, arr.length);
			expectPartitioned(arr, arr.length);
			assert.equal(val, 9);
		});
});
