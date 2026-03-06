/**
 * Problem 14: 3Sum Closest (LeetCode 16)
 * Difficulty: Med
 * Language: Scala
 */
def threeSumClosest(nums: Array[Int], target: Int): Int = {
  val sorted = nums.sorted
  val n = sorted.length

  @annotation.tailrec
  def search(i: Int, l: Int, r: Int, closest: Int): Int = {
    if (l >= r) closest
    else {
      val sum = sorted(i) + sorted(l) + sorted(r)
      val better = if (math.abs(sum - target) < math.abs(closest - target)) sum else closest
      if (sum < target) search(i, l + 1, r, better)
      else if (sum > target) search(i, l, r - 1, better)
      else sum
    }
  }

  (0 until n - 2).foldLeft(Int.MaxValue) { (closest, i) =>
    search(i, i + 1, n - 1, closest)
  }
}
