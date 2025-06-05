import { describe, it } from "node:test";
import assert from "node:assert";
import { addHash, calcHash, shiftHash, rollingHash } from './rabin-karp.js';

describe("rabin-fingerprint", () => {
  const mod = 10**9 + 7;
  const code = (c) => c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  const codes = (s, k) => Array.from(s.slice(0, k)).map(code);
  const s = "abcdefghijklmnopqrstuvwxyz";

  describe("addHash", () => {
    it("adds hash for a subsequence", () => {
      const p = 31;
      const add = (n, h, i, c) => addHash(mod, p, n, h, i, c);
      const hash1 = codes(s, 1).reduce((a, c, i) => add(1, a, i, c), 0);
      assert.equal(hash1, (
        code('a') * p**0
      ) % mod);

      const hash2 = codes(s, 2).reduce((a, c, i) => add(2, a, i, c), 0);
      assert.equal(hash2, (
        code('a') * p**1 +
        code('b') * p**0
      ) % mod);

      const hash3 = codes(s, 3).reduce((a, c, i) => add(3, a, i, c), 0);
      assert.equal(hash3, (
        code('a') * p**2 +
        code('b') * p**1 +
        code('c') * p**0
      ) % mod);
    });
  });

  describe('calcHash', () => {
    it('calculates hash for a subsequence', () => {
      const p = 31;
      const n = 4;
      const hash = calcHash(mod, p, codes(s, n));
      assert.equal(hash, (
        code('a') * p**3 +
        code('b') * p**2 +
        code('c') * p**1 +
        code('d') * p**0
      ) % mod);
    });
  });

  describe('shiftHash', () => {
    it('shifts hash for a subsequence', () => {
      const p = 31;
      const n = 4;
      let hash = calcHash(mod, p, codes(s, n));
      const list = [hash];
      for (let i = 0; i < s.length - n; i++) {
        const drop = code(s[i]);
        const add = code(s[i + n]);
        hash = shiftHash(mod, p, n, hash, drop, add);
        list.push(hash);
      }
      assert.deepEqual(list, [
        31810, 62594, 93378, 124162, 154946, 185730,
        216514, 247298, 278082, 308866, 339650, 370434,
        401218, 432002, 462786, 493570, 524354, 555138,
        585922, 616706, 647490, 678274, 709058
      ]);
    });
  });

  describe('rollingHash', () => {
    it('calculates rolling hash for a subsequence', () => {
      const codes = Array.from(s).map(code);
      const hashes = rollingHash(mod, 31, 4, codes);
      assert.deepEqual(Array.from(hashes), [
        31810, 62594, 93378, 124162, 154946, 185730, 216514,
        247298, 278082, 308866, 339650, 370434, 401218, 432002,
        462786, 493570, 524354, 555138, 585922, 616706, 647490,
         678274, 709058
      ]);
    });
    it('should find repeated patterns', () => {
      const codes = Array.from('abcd|abcd|abcd').map(code);
      const hashes = rollingHash(mod, 31, 4, codes);
      assert.deepEqual(Array.from(hashes), [
        31810,  62617,  94086, 146105, 835174,
        31810,  62617,  94086, 146105, 835174,
        31810
      ]);
    });
  });

});
