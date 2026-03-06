/**
 * Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
 * Difficulty: Med
 * Language: Scala
 */
import scala.util.Random
class RandomizedSet {
  private var map = Map.empty[Int, Int]
  private var list = Vector.empty[Int]
  def insert(v: Int): Boolean =
    if (map.contains(v)) false
    else { map += (v -> list.size); list :+= v; true }
  def remove(v: Int): Boolean =
    if (!map.contains(v)) false
    else {
      val idx = map(v); val last = list.last
      val nl = list.init.updated(idx, last)
      map = (map - v).updated(last, idx)
      if (idx == list.size - 1) map -= v
      list = if (idx < nl.size) nl else list.init
      true
    }
  def getRandom(): Int = list(Random.nextInt(list.size))
}
