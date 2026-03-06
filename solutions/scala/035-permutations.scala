/**
 * Problem 35: Permutations (LeetCode 46)
 * Difficulty: Med
 * Language: Scala
 */
def permute(nums: List[Int]): List[List[Int]] = nums match {
  case Nil => List(Nil)
  case _ => nums.flatMap(n =>
    permute(nums.filterNot(_ == n)).map(n :: _)
  )
}
