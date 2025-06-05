export function * rollingHash(mod, p, n, s) {
  let hash = calcHash(mod, p, s.slice(0, n));
  console.log(hash, 'hash');
  yield hash;
  for (let i = 0; i < s.length - n; i++) {
    const codeDrop = s[i];
    const codeAdd = s[i + n];
    hash = shiftHash(mod, p, n, hash, codeDrop, codeAdd);
    yield hash;
  }
}

/**
 * Adds a character to a rolling polynomial hash.
 * @param {number} mod Max value for the hash (modulus)
 * @param
 *
 *
 *     {number} p Base for the polynomial hash
 * @param {number} n Size of the string being hashed
 * @param {string} s String to hash
 * @param {number} hash Current hash value
 * @param {number} code Numberic value of the character to add
 * @returns {number} Updated hash value
 */
export const addHash = (mod, p, n, hash, i, code) => {
  const pow = n - i - 1;
  hash += code * p**pow;
  hash %= mod;
  return hash;
};

/**
 * Shifts a rolling polynomial hash
 * @param {number} mod Max value for the hash (modulus)
 * @param {number} p Base for the polynomial hash
 * @param {number} n Size of the string being hashed
 * @param {number} hash Current hash value
 * @param {number} codeDrop Numeric value of the character to remove
 * @param {number} codeAdd Numeric value of the character to add
 * @returns {number} Updated hash value
 */
export const shiftHash = (mod, p, n, hash, codeDrop, codeAdd) => {
  hash -= codeDrop * p**(n - 1);
  hash *= p;
  hash += codeAdd;
  hash %= mod;
  return hash;
}

/**
 * Calculates the hash for a sequence of characters.
 * @param {number} mod Max value for the hash (modulus)
 * @param {number} p Base for the polynomial hash
 * @param {Array<number>} codes Array of numeric values of characters
 * @returns {number} Hash value for the sequence
 */
export const calcHash = (mod, p, codes) => {
  let hash = 0;
  for (let i = 0; i < codes.length; i++) {
    hash = addHash(mod, p, codes.length, hash, i, codes[i]);
  }
  return hash;
};
