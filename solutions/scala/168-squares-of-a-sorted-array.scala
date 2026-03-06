/**
 * Problem 168: Squares of a Sorted Array (LeetCode 977)
 * Difficulty: Easy
 * Language: Scala
 */
def sortedSquares(nums: Array[Int]): Array[Int] = {
  val n = nums.length
  val result = new Array[Int](n)
  def merge(l: Int, r: Int, i: Int): Array[Int] = {
    if (i < 0) result
    else if (math.abs(nums(l)) >= math.abs(nums(r))) {
      result(i) = nums(l) * nums(l); merge(l + 1, r, i - 1)
    } else {
      result(i) = nums(r) * nums(r); merge(l, r - 1, i - 1)
    }
  }
  merge(0, n - 1, n - 1)
}
