/**
 * Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
 * Difficulty: Med
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function distanceK(root: TreeNode | null, target: TreeNode, k: number): number[] {
  const parentMap = new Map<TreeNode, TreeNode | null>();
  const buildParent = (node: TreeNode | null, parent: TreeNode | null): void => {
    if (!node) return;
    parentMap.set(node, parent);
    buildParent(node.left, node);
    buildParent(node.right, node);
  };
  buildParent(root, null);
  const bfs = (start: TreeNode, k: number): number[] => {
    const visited = new Set<TreeNode>();
    let queue: TreeNode[] = [start];
    visited.add(start);
    let dist = 0;
    while (queue.length > 0 && dist < k) {
      queue = queue.reduce<TreeNode[]>((next, node) => {
        const neighbors = [node.left, node.right, parentMap.get(node) ?? null]
          .filter((n): n is TreeNode => n !== null && !visited.has(n));
        neighbors.forEach(n => visited.add(n));
        return [...next, ...neighbors];
      }, []);
      dist++;
    }
    return queue.map(n => n.val);
  };
  return bfs(target, k);
}
