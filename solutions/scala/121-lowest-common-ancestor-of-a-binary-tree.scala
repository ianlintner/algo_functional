/**
 * Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
 * Difficulty: Med
 * Language: Scala
 */
def lca[A](root: Tree[A], p: A, q: A): Option[A] = root match {
  case Leaf => None
  case Node(_, v, _) if v == p || v == q => Some(v)
  case Node(l, v, r) =>
    (lca(l, p, q), lca(r, p, q)) match {
      case (Some(_), Some(_)) => Some(v)
      case (Some(x), None) => Some(x)
      case (None, Some(x)) => Some(x)
      case _ => None
    }
}
