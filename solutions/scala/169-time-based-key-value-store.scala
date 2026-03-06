/**
 * Problem 169: Time Based Key-Value Store (LeetCode 981)
 * Difficulty: Med
 * Language: Scala
 */
import scala.collection.immutable.TreeMap

class TimeMap {
  private var store = Map.empty[String, TreeMap[Int, String]]

  def set(key: String, value: String, timestamp: Int): Unit =
    store = store.updated(key, store.getOrElse(key, TreeMap.empty) + (timestamp -> value))

  def get(key: String, timestamp: Int): String =
    store.get(key).flatMap(_.to(timestamp).lastOption.map(_._2)).getOrElse("")
}
