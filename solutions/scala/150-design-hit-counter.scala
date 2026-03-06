/**
 * Problem 150: Design Hit Counter (LeetCode 362)
 * Difficulty: Med
 * Language: Scala
 */
case class HitCounter(hits: List[Int] = Nil) {
  def hit(timestamp: Int): HitCounter = HitCounter(hits :+ timestamp)
  def getHits(timestamp: Int): (Int, HitCounter) = {
    val filtered = hits.filter(_ > timestamp - 300)
    (filtered.length, HitCounter(filtered))
  }
}
