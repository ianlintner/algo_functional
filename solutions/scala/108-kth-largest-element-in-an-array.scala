/**
 * Problem 108: Kth Largest Element in an Array (LeetCode 215)
 * Difficulty: Med
 * Language: Scala
 */
def findKthLargest(nums: Array[Int], k: Int): Int = {
  val pivot = nums(nums.length / 2)
  val (hi, eq, lo) = (nums.filter(_ > pivot),
    nums.filter(_ == pivot), nums.filter(_ < pivot))
  if (k <= hi.length) findKthLargest(hi, k)
  else if (k <= hi.length + eq.length) pivot
  else findKthLargest(lo, k - hi.length - eq.length)
}
