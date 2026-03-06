/**
 * Problem 123: Sliding Window Maximum (LeetCode 239)
 * Difficulty: Hard
 * Language: Scala
 */
import scala.collection.immutable.Queue
def maxSlidingWindow(nums: Array[Int], k: Int): Array[Int] = {
  val (_, res) = nums.indices.foldLeft((Queue.empty[Int], Array.empty[Int])) {
    case ((dq, res), i) =>
      val dq1 = if (dq.nonEmpty && dq.head <= i - k) dq.tail else dq
      val dq2 = dq1.reverse.dropWhile(j => nums(j) <= nums(i)).reverse.enqueue(i)
      val r = if (i >= k - 1) res :+ nums(dq2.head) else res
      (dq2, r)
  }
  res
}
