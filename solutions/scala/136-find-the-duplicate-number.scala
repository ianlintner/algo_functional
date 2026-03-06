/**
 * Problem 136: Find the Duplicate Number (LeetCode 287)
 * Difficulty: Med
 * Language: Scala
 */
def findDuplicate(nums: Array[Int]): Int = {
  def step(i: Int): Int = nums(i)
  def findMeet(s: Int, f: Int): Int = {
    val (s2, f2) = (step(s), step(step(f)))
    if (s2 == f2) s2 else findMeet(s2, f2)
  }
  def findStart(a: Int, b: Int): Int =
    if (a == b) a else findStart(step(a), step(b))
  val meet = findMeet(step(0), step(step(0)))
  findStart(0, meet)
}
