/**
 * Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
 * Difficulty: Hard
 * Language: Scala
 */
def smallestRange(nums: List[List[Int]]): Array[Int] = {
  val tagged = nums.zipWithIndex.flatMap { case (list, i) => list.map(v => (v, i)) }.sortBy(_._1)
  val k = nums.length
  val (_, _, best, _) = tagged.foldLeft((0, Map.empty[Int, Int], (Int.MinValue, Int.MaxValue), 0)) {
    case ((left, counts, best, covered), (v, g)) =>
      val c2 = counts.updated(g, counts.getOrElse(g, 0) + 1)
      val cov2 = if (counts.getOrElse(g, 0) == 0) covered + 1 else covered
      @annotation.tailrec
      def shrink(l: Int, cs: Map[Int,Int], cv: Int, b: (Int,Int)): (Int, Map[Int,Int], Int, (Int,Int)) = {
        if (cv < k) (l, cs, cv, b)
        else {
          val (lv, lg) = tagged(l)
          val nb = if (v - lv < b._2 - b._1) (lv, v) else b
          val cs2 = cs.updated(lg, cs(lg) - 1)
          val cv2 = if (cs2(lg) == 0) cv - 1 else cv
          shrink(l+1, cs2, cv2, nb)
        }
      }
      val (l2, c3, cov3, b2) = shrink(left, c2, cov2, best)
      (l2, c3, b2, cov3)
  }
  Array(best._1, best._2)
}
