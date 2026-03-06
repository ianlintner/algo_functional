/**
 * Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
 * Difficulty: Med
 * Language: Scala
 */
def lcaBST(root: Tree[Int], p: Int, q: Int): Option[Int] = root match {
  case Leaf => None
  case Node(l, v, _) if p < v && q < v => lcaBST(l, p, q)
  case Node(_, v, r) if p > v && q > v => lcaBST(r, p, q)
  case Node(_, v, _) => Some(v)
}
