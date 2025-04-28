

import { describe, it } from "node:test";
import assert from "node:assert";
import { getBits, getNums } from './lfsr.js';

describe("lfsr", () => {
  describe("getBits", () => {
    it('should generate random bits', () => {
      assert.deepEqual([...getBits(32, 1)], [
        0, 0, 0, 0, 1, 0, 0, 0,
        1, 1, 0, 0, 1, 0, 1, 0,
        1, 1, 1, 1, 1, 0, 0, 0,
        0, 1, 0, 0, 0, 1, 1, 0
      ]);

      assert.deepEqual([...getBits(32, 0)], [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ]);

      assert.deepEqual([...getBits(32, 0b1111)], [
        1, 1, 1, 0, 0, 0, 0, 1,
        0, 0, 0, 1, 1, 0, 0, 1,
        0, 1, 0, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 1, 0, 0, 0
      ]);
    });
  });

  describe("getNums", () => {
    it('should generate random numbers', () => {
      assert.deepEqual([...getNums(4, 32, 1)], [
        0,   1,  3,  5, 15,  1,  2, 6,
        10, 14,  3,  4, 12,  4, 13, 7,
        8,   8,  9, 10, 15,  0,  1, 3,
        5,  15,  1,  2,  6, 10, 14, 3
      ]);

      assert.deepEqual([...getNums(4, 32, 0)], [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
      ]);
    });
  });
});
