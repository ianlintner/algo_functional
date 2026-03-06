/**
 * Problem 86: Sort List (LeetCode 148)
 * Difficulty: Med
 * Language: Scala
 */
def sortList(xs: List[Int]): List[Int] = xs match {
  case Nil | _ :: Nil => xs
  case _ =>
    val (l, r) = xs.splitAt(xs.length / 2)
    def merge(a: List[Int], b: List[Int]): List[Int] = (a, b) match {
      case (Nil, _) => b
      case (_, Nil) => a
      case (x :: xs2, y :: ys) =>
        if (x <= y) x :: merge(xs2, b) else y :: merge(a, ys)
    }
    merge(sortList(l), sortList(r))
}
