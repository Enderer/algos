import { describe, it } from "node:test";
import assert from "node:assert";
import { postOrder } from './post-order.js';

function createNode(val, left = null, right = null) {
  return { val, left, right };
}

describe('postOrder', () => {
  it('yields nodes in post-order for a balanced tree', () => {
    //      a
    //     / \
    //    b   c
    //   / \
    //  d   e
    const d = createNode('d');
    const e = createNode('e');
    const b = createNode('b', d, e);
    const c = createNode('c');
    const a = createNode('a', b, c);
    const result = [...postOrder(a)].map(n => n.val);
    assert.deepStrictEqual(result, ['d', 'e', 'b', 'c', 'a']);
  });

  it('yields nodes in post-order for a single node', () => {
    const a = createNode('a');
    const result = [...postOrder(a)].map(n => n.val);
    assert.deepStrictEqual(result, ['a']);
  });

  it('yields nodes in post-order for left-skewed tree', () => {
    // a
    //  \
    //   b
    //    \
    //     c
    const c = createNode('c');
    const b = createNode('b', null, c);
    const a = createNode('a', null, b);
    const result = [...postOrder(a)].map(n => n.val);
    assert.deepStrictEqual(result, ['c', 'b', 'a']);
  });

  it('yields nodes in post-order for right-skewed tree', () => {
    //   a
    //  /
    // b
    ///
    //c
    const c = createNode('c');
    const b = createNode('b', c, null);
    const a = createNode('a', b, null);
    const result = [...postOrder(a)].map(n => n.val);
    assert.deepStrictEqual(result, ['c', 'b', 'a']);
  });

  it('yields nothing for null root', () => {
    const result = [...postOrder(null)];
    assert.deepStrictEqual(result, []);
  });
});
