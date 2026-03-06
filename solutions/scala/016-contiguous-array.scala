/**
 * Problem 16: Contiguous Array (LeetCode 525)
 * Difficulty: Med
 * Language: Scala
 */
def findMaxLength(nums: Array[Int]): Int = {
  nums.zipWithIndex.foldLeft((Map(0 -> -1), 0, 0)) {
    case ((seen, count, best), (num, i)) =>
      val newCount = count + (if (num == 1) 1 else -1)
      val newBest = seen.get(newCount).map(j => math.max(best, i - j)).getOrElse(best)
      val newSeen = if (seen.contains(newCount)) seen else seen + (newCount -> i)
      (newSeen, newCount, newBest)
  }._3
}
