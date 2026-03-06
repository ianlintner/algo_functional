/**
 * Problem 25: Next Permutation (LeetCode 31)
 * Difficulty: Med
 * Language: Scala
 */
def nextPermutation(nums: Array[Int]): Unit = {
  val n = nums.length
  val i = (0 until n - 1).reverse.find(i => nums(i) < nums(i + 1))

  i match {
    case None => java.util.Arrays.sort(nums)
    case Some(idx) =>
      val j = (0 until n).reverse.find(j => nums(j) > nums(idx)).get
      val tmp = nums(idx); nums(idx) = nums(j); nums(j) = tmp
      var lo = idx + 1; var hi = n - 1
      while (lo < hi) {
        val t = nums(lo); nums(lo) = nums(hi); nums(hi) = t
        lo += 1; hi -= 1
      }
  }
}
