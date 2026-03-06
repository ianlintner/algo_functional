/**
 * Problem 126: Meeting Rooms (LeetCode 252)
 * Difficulty: Easy
 * Language: Scala
 */
def canAttendMeetings(intervals: List[(Int, Int)]): Boolean = {
  val sorted = intervals.sortBy(_._1)
  sorted.zip(sorted.tail).forall { case ((_, e), (s, _)) => e <= s }
}
