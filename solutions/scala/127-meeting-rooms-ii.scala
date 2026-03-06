/**
 * Problem 127: Meeting Rooms II (LeetCode 253)
 * Difficulty: Med
 * Language: Scala
 */
def minMeetingRooms(intervals: List[(Int, Int)]): Int = {
  val starts = intervals.map(_._1).sorted
  val ends = intervals.map(_._2).sorted
  def go(ss: List[Int], es: List[Int], rooms: Int, maxR: Int): Int =
    ss match {
      case Nil => maxR
      case s :: srest => es match {
        case e :: erest if s < e => go(srest, es, rooms + 1, maxR max (rooms + 1))
        case _ :: erest => go(srest, erest, rooms, maxR)
      }
    }
  go(starts, ends, 0, 0)
}
