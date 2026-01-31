/**
 * Floyd Warshall
 * Finds shortest paths between all nodes in a directed graph.
 * Handles both positive and negative weights, but not negative cycles.
 * Time complexity: O(v^3)
 * Space complexity: O(v^2)
 * @param {number} n Number of nodes in the graph
 * @param {Array<[number, number, number]>} edges Edges as [source, target, weight]
 */
export const floydWarshall = (n, edges) => {
  const INF = Number.POSITIVE_INFINITY;
  const paths = Array.from({ length: n }, () => Array(n).fill(INF));

  // Set self paths to 0
  for (let i = 0; i < n; i++) {
    paths[i][i] = 0;
  }

  // Set known edges. Handle duplicate edges
  for (const [s, t, w] of edges) {
    paths[s][t] = Math.min(w, paths[s][t]);
  }

  // Check if a shorter path exists between to nodes i,j
  // if you force the path to go through node v
  for (let v = 0; v < n; v++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const current = paths[i][j];
        const candidate = paths[i][v] + paths[v][j];
        paths[i][j] = Math.min(current, candidate);
      }
    }
  }

  return paths;
};

