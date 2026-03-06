/**
 * Problem 84: LRU Cache (LeetCode 146)
 * Difficulty: Med
 * Language: Scala
 */
case class LRU[V](cap: Int, order: List[Int] = Nil, cache: Map[Int, V] = Map.empty[Int, V]) {
  def get(key: Int): (Option[V], LRU[V]) = cache.get(key) match {
    case None => (None, this)
    case Some(v) => (Some(v), copy(order = order.filterNot(_ == key) :+ key))
  }
  def put(key: Int, value: V): LRU[V] = {
    val newOrder = order.filterNot(_ == key) :+ key
    val newCache = cache + (key -> value)
    if (newOrder.length > cap)
      LRU(cap, newOrder.tail, newCache - newOrder.head)
    else LRU(cap, newOrder, newCache)
  }
}
