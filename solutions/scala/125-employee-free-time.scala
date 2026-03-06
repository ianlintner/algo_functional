/**
 * Problem 125: Employee Free Time (LeetCode 759)
 * Difficulty: Hard
 * Language: Scala
 */
def employeeFreeTime(schedules: List[List[(Int, Int)]]): List[(Int, Int)] = {
  val sorted = schedules.flatten.sortBy(_._1)
  val merged = sorted.foldLeft(List.empty[(Int, Int)]) {
    case ((a, b) :: t, (s, e)) if b >= s => (a, b max e) :: t
    case (acc, iv) => iv :: acc
  }.reverse
  merged.sliding(2).collect {
    case List((_, e1), (s2, _)) if e1 < s2 => (e1, s2)
  }.toList
}
