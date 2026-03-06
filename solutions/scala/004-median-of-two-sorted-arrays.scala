/**
 * Problem 4: Median of Two Sorted Arrays (LeetCode 4)
 * Difficulty: Hard
 * Language: Scala
 */
def findMedianSortedArrays(nums1: Array[Int], nums2: Array[Int]): Double = {
  val merged = (nums1 ++ nums2).sorted
  val n = merged.length
  val mid = n / 2
  if (n % 2 == 0) (merged(mid - 1) + merged(mid)) / 2.0
  else merged(mid).toDouble
}
