/**
 * Problem 79: Gas Station (LeetCode 134)
 * Difficulty: Med
 * Language: Scala
 */
def canCompleteCircuit(gas: List[Int], cost: List[Int]): Int = {
  val (total, _, start) = gas.zip(cost).zipWithIndex.foldLeft((0, 0, 0)) {
    case ((tot, tank, s), ((g, c), i)) =>
      val d = g - c; val (t2, tk2) = (tot + d, tank + d)
      if (tk2 < 0) (t2, 0, i + 1) else (t2, tk2, s)
  }
  if (total >= 0) start else -1
}
