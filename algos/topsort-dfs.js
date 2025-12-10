/**
 *
 * @param {*} n Number of nodes in the graph
 * @param {*} edges Graph edges as [from, to] pairs
 * @returns A topological ordering of the nodes
 * @throws If the graph contains a cycle
 */
export const topsortDFS = (n, edges) => {
  const visited = new Set();
  const path = new Set();
  const results = [];

  const list = createAdjacencyList(n, edges);
  for (let i = n - 1; i >= 0; i--) {
    const success = dfs(list, visited, path, results, i);
    if (success === false) { return []; }
  }

  const sorted = results.reverse();
  return sorted;
};

const createAdjacencyList = (n, edges) => {
  const list = {};
  for (const [post, pre] of edges) {
    if (post >= n || pre >= n) { continue; }
    if (post < 0 || pre < 0) { continue; }
    list[post] = list[post] ?? [];
    list[post].push(pre);
  }
  return list;
};

const dfs = (list, visited, path, results, i) => {
  if (path.has(i)) { return false; }
  if (visited.has(i)) { return true; }

  path.add(i);
  const childs = list[i] ?? [];
  for (const child of childs) {
    const success = dfs(list, visited, path, results, child);
    if (success === false) { return false; }
  }
  path.delete(i);
  visited.add(i);
  results.push(i);
  return true;
};
