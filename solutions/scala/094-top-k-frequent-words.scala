/**
 * Problem 94: Top K Frequent Words (LeetCode 692)
 * Difficulty: Med
 * Language: Scala
 */
def topKFrequent(words: List[String], k: Int): List[String] =
  words.groupBy(identity)
    .view.mapValues(_.length).toList
    .sortBy { case (w, c) => (-c, w) }
    .take(k)
    .map(_._1)
