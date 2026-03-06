/**
 * Problem 44: Merge Intervals (LeetCode 56)
 * Difficulty: Med
 * Language: Scala
 */
def merge(intervals: Array[Array[Int]]): Array[Array[Int]] =
  intervals.sortBy(_(0)).foldLeft(List.empty[Array[Int]]) { (acc, cur) =>
    acc match {
      case last :: rest if cur(0) <= last(1) =>
        Array(last(0), last(1) max cur(1)) :: rest
      case _ => cur :: acc
    }
  }.reverse.toArray
