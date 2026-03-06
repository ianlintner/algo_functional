/**
 * Problem 138: Find Median from Data Stream (LeetCode 295)
 * Difficulty: Hard
 * Language: Scala
 */
import scala.collection.mutable.PriorityQueue
class MedianFinder {
  private val lo = PriorityQueue.empty[Int]            // max-heap
  private val hi = PriorityQueue.empty[Int](Ordering[Int].reverse) // min-heap
  def addNum(num: Int): Unit = {
    lo.enqueue(num)
    hi.enqueue(lo.dequeue())
    if (hi.size > lo.size) lo.enqueue(hi.dequeue())
  }
  def findMedian(): Double =
    if (lo.size > hi.size) lo.head.toDouble
    else (lo.head + hi.head) / 2.0
}
