/**
 * Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
 * Difficulty: Easy
 * Language: Scala
 */
def sortedArrayToBST[A](nums: Vector[A]): Tree[A] =
  if (nums.isEmpty) Nil
  else {
    val mid = nums.length / 2
    Node(nums(mid),
         sortedArrayToBST(nums.take(mid)),
         sortedArrayToBST(nums.drop(mid + 1)))
  }
