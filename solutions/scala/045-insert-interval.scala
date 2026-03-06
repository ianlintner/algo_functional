/**
 * Problem 45: Insert Interval (LeetCode 57)
 * Difficulty: Med
 * Language: Scala
 */
def insert(intervals: Array[Array[Int]], newInterval: Array[Int]): Array[Array[Int]] =
  (intervals :+ newInterval).sortBy(_(0)).foldLeft(List.empty[Array[Int]]) { (acc, cur) =>
    acc match {
      case last :: rest if cur(0) <= last(1) =>
        Array(last(0), last(1) max cur(1)) :: rest
      case _ => cur :: acc
    }
  }.reverse.toArray
