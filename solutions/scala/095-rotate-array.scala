/**
 * Problem 95: Rotate Array (LeetCode 189)
 * Difficulty: Med
 * Language: Scala
 */
def rotate[A](nums: Vector[A], k: Int): Vector[A] = {
  val n = nums.length
  val s = k % n
  nums.drop(n - s) ++ nums.take(n - s)
}
