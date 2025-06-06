export function * postOrder(root) {
  const stack = [root];
  const visited = new Set();
  while (stack.length > 0) {
    const node = stack.pop();
    if (node == null) {
      continue;
    } else if (visited.has(node)) {
      yield node;
      visited.delete(node);
    } else {
      visited.add(node);
      stack.push(node);
      stack.push(node.right);
      stack.push(node.left);
    }
  }
};
