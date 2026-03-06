/**
 * Problem 32: Combination Sum (LeetCode 39)
 * Difficulty: Med
 * Language: Scala
 */
def combinationSum(candidates: Array[Int], target: Int): List[List[Int]] = {
  val sorted = candidates.sorted
  def go(start: Int, remain: Int, curr: List[Int]): List[List[Int]] = {
    if (remain == 0) List(curr.reverse)
    else if (start >= sorted.length || sorted(start) > remain) Nil
    else go(start, remain - sorted(start), sorted(start) :: curr) ++
         go(start + 1, remain, curr)
  }
  go(0, target, Nil)
}
