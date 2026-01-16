/**
 * Dijkstra's Shortest Path - Single-source shortest path finding.
 * - BFS with a priority queue

 * Time Complexity  - O(E log V)
                      O(E + V log V)  # With Fibonacci heap

 * Space Complexity - O(V)  # For path and queue (if eager)
 *                    O(E)  # For queue if lazy
 *
 * Notes:
 * - Performs a BFS with the help of a MinQueue to ensure shortest paths are visited first
 * - Will find the shortest path from a single node to all nodes in the graph
 * - Works for cyclic graphs with positive weights
 * - If you are looking for shortest path to a specific target, you can exit early
 * - For large or dense graphs, use indexed priority queue to update
 *   existing value in queue instead of adding duplicates
 *
 * Cases to handle:
 * - Direct edge or one with fewer steps is more expensive
 * - Parallel edges between the same two nodes with different weights
 * - Zero-weight edges
 * - Cycles in the graph
 * - Self-loops like [u, u, w] should not worsen the settled distance for u.
 * - Equal-cost alternative paths - should be deterministic
 * - Undirected graph - just needs to duplicate each edge to point in both directions
 * - Single-node graph, no edges
 *
 * Cases that can't be handled:
 * - Negative weights: Can't be handled by this algorithm
 *
 * @param {*} edges Edges for each connection between two nodes
 * @param {*} start Starting node
 */
export const dijkstras = (edges, start) => {
  // Create an adjacency lookup from list of edges
  const adj = new Map();
  for (const [s, e, w] of edges) {
    const list = adj.get(s) ?? [];
    adj.set(s, list);
    list.push([s, e, w]);
  }

  // Store cost of the shortest path to every node from the source as well as
  // the node directly before it in the path, so we can recreate the full path.
  // { endNode: [startNode, weight] }
  const paths = new Map();

  // Priority queue will provide the cheapest edge available while we perform a BFS.
  const queue = createPriorityQueue();

  // Init with the start node and a cost of 0.
  queue.enqueue([start, start, 0]);

  while (queue.size() > 0) {
    const [startNode, endNode, weight] = queue.dequeue();

    // If we have already found a path to this node we can skip it
    // The shortest path for a node will always be the first one found
    if (paths.has(endNode)) { continue; }

    // We found the shortest path to this node. Save which node took us there
    // and the total cost it took to get there from the start node.
    // If we are looking for the shortest path between two specific nodes
    // we can return this value and end the function now.
    paths.set(endNode, [startNode, weight]);

    // Continue with the BFS by adding all adjacent nodes to the queue
    // The cost to get to these nodes will be the cost to get to the next node
    // from this one, plus the cost it took to get to this node.
    // We can skip adding the node if it node already has a path found
    // or we can lazily delete it by just adding it since the priority queue
    // will ensure it doesn't get visited until after a shorter path
    const neighbors = adj.get(endNode) ?? [];
    for (const [nStart, nEnd, nWeight] of neighbors) {
      queue.enqueue([nStart, nEnd, nWeight + weight]);
    }
  }

  // We now have a lookup that tells us for each node the shortest path to
  // get to it from the starting node as well as the node just before it
  // in the path. To find the specific nodes in the path for any given node,
  // just walk backward from the destination until you get to the start
  return paths;
}

/**
 * Simple priority queue, not optimal.
 * This would be replaced in a real implementation
 */
const createPriorityQueue = () => {
  const queue = [];
  return {
    enqueue: (node) => {
      queue.push(node)
    },
    dequeue: () => {
      if (queue.length === 0) { return undefined; }
      queue.sort((a, b) => b[2] - a[2]);
      return queue.pop();
    },
    size: () => queue.length
  };
}