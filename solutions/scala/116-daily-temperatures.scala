/**
 * Problem 116: Daily Temperatures (LeetCode 739)
 * Difficulty: Med
 * Language: Scala
 */
def dailyTemperatures(temps: Array[Int]): Array[Int] = {
  val n = temps.length
  (0 until n).foldRight((List.empty[Int], Array.fill(n)(0))) {
    case (i, (stack, res)) =>
      val s = stack.dropWhile(j => temps(j) <= temps(i))
      res(i) = s.headOption.map(_ - i).getOrElse(0)
      (i :: s, res)
  }._2
}
