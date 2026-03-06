/**
 * Problem 70: Path Sum II (LeetCode 113)
 * Difficulty: Med
 * Language: Scala
 */
def pathSum(t: Tree[Int], target: Int): List[List[Int]] = t match {
  case Nil => Nil
  case Node(v, Nil, Nil) => if (v == target) List(List(v)) else Nil
  case Node(v, l, r) =>
    (pathSum(l, target - v) ++ pathSum(r, target - v)).map(v :: _)
}
