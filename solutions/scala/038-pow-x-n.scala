/**
 * Problem 38: Pow(x, n) (LeetCode 50)
 * Difficulty: Med
 * Language: Scala
 */
def myPow(x: Double, n: Int): Double = n match {
  case 0 => 1.0
  case _ if n < 0 => myPow(1.0 / x, -(n.toLong).toInt)
  case _ if n % 2 == 0 => myPow(x * x, n / 2)
  case _ => x * myPow(x * x, n / 2)
}
