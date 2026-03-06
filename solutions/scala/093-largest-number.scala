/**
 * Problem 93: Largest Number (LeetCode 179)
 * Difficulty: Med
 * Language: Scala
 */
def largestNumber(nums: List[Int]): String = {
  val strs = nums.map(_.toString).sortWith((a, b) => (a + b) > (b + a))
  val res = strs.mkString
  if (res.startsWith("0")) "0" else res
}
