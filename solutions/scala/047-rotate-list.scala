/**
 * Problem 47: Rotate List (LeetCode 61)
 * Difficulty: Med
 * Language: Scala
 */
def rotateRight[A](list: List[A], k: Int): List[A] = list match {
  case Nil => Nil
  case _ =>
    val n = list.length
    val rot = k % n
    if (rot == 0) list
    else list.drop(n - rot) ++ list.take(n - rot)
}
