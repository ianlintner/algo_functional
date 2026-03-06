/**
 * Problem 83: Reorder List (LeetCode 143)
 * Difficulty: Med
 * Language: Scala
 */
def reorderList(list: List[Int]): List[Int] = {
  val mid = list.length / 2
  val (first, secondHalf) = list.splitAt(mid)
  val second = secondHalf.reverse
  def merge(a: List[Int], b: List[Int]): List[Int] = (a, b) match {
    case (Nil, bs) => bs
    case (as_, Nil) => as_
    case (ah :: at, bh :: bt) => ah :: bh :: merge(at, bt)
  }
  merge(first, second)
}
