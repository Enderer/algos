/**
 * Returns a random sequence of numbers using a linear feedback shift register
 * @param {*} bits Size (num bits) of the random number to generate.
 * @param {*} count Number of random numbers to generate
 * @param {*} seed Initial seed value
 */
export function * getNums(bits, count, seed) {
  const bitstream = getBits(bits * count, seed);
  for (let i = 0; i < count; i++) {
    let num = 0;
    for (let b = 0; b < bits; b++) {
      const bit = bitstream.next().value;
      num |= (bit << b);
    }
    yield num;
  }
}

/**
 * Returns a random sequence of bits
 * @param {*} count Number of bits to generate
 * @param {*} seed Initial seed value
 */
export function * getBits(count, seed) {
  for (let i = 0; i < count; i++) {
    const t = (seed & 1) ^ ((seed >> 1) & 1);
    seed >>>= 1;
    seed |= t << 4;
    yield seed & 1;
  }
}

/**
 * Wraps the random number generator in a function that calculates stats
 * on the stream of numbers.
 * @param {*} reduce
 * @param {*} gen
 * @param {*} o
 * @returns
 */
export function getStats(reduce, gen, o) {
  const iterator = gen()[Symbol.iterator]();
  let stats = o;
  return {
    *[Symbol.iterator]() {
      let next = iterator.next();
      while (next.done === false) {
        const { value, done } = next;
        stats = reduce(stats, value);
        yield value;
        next = iterator.next();
      }
    },
    get stats() { return stats; }
  }
}

/**
 * Calculates the average of a stream of numbers
 * @param {*} stats Stats object from the previous iteration
 * @param {*} val New value to incorporate into the average
 */
export const statsAvgReducer = (stats, val) => {
  const avg = stats.avg + (val - stats.avg) / (stats.count + 1);
  stats.avg = avg;
  stats.count += 1;
  return stats;
};
