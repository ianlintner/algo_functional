/**
 * Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
 * Difficulty: Hard
 * Language: Scala
 */
def jobScheduling(startTime: Array[Int], endTime: Array[Int], profit: Array[Int]): Int = {
  val jobs = startTime.zip(endTime).zip(profit).map{case ((s,e),p) => (s,e,p)}.sortBy(_._2)
  val n = jobs.length
  val ends = jobs.map(_._2)
  def bisect(v: Int, hi: Int): Int =
    ends.take(hi).lastIndexWhere(_ <= v) match { case -1 => 0; case i => i + 1 }
  (1 to n).foldLeft(Array.fill(n+1)(0)) { (dp, i) =>
    val prev = bisect(jobs(i-1)._1, i-1)
    dp(i) = dp(i-1).max(dp(prev) + jobs(i-1)._3); dp
  }(n)
}
