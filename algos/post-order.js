/**
 * Iterative post-order traversal (left, right, node) for a binary tree.
 * Uses a stack and a visited set to avoid recursion.
 * @param {*} root
 */
export function * postOrder(root) {
  const visited = new Set();
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) {
      // Node has been seen and it's children have been visited
      yield node;
      visited.delete(node);
    } else {
      // Node hasn't been seen.  Add it to the bottom of the
      // stack and push its children to be processes first.
      visited.add(node);
      stack.push(node);
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }
  }
};
