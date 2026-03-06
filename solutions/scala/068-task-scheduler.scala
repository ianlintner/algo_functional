/**
 * Problem 68: Task Scheduler (LeetCode 621)
 * Difficulty: Med
 * Language: Scala
 */
def leastInterval(tasks: Array[Char], n: Int): Int = {
  val freqs = tasks.groupBy(identity).values.map(_.length).toList
  val maxFreq = freqs.max
  val maxCount = freqs.count(_ == maxFreq)
  tasks.length max ((maxFreq - 1) * (n + 1) + maxCount)
}
