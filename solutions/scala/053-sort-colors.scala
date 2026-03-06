/**
 * Problem 53: Sort Colors (LeetCode 75)
 * Difficulty: Med
 * Language: Scala
 */
def sortColors(nums: Array[Int]): Array[Int] = {
  val counts = nums.foldLeft(Array(0,0,0)) { (c, n) => c.updated(n, c(n)+1) }
  (0 to 2).flatMap(i => Array.fill(counts(i))(i)).toArray
}
