/**
 * Problem 56: Subsets (LeetCode 78)
 * Difficulty: Med
 * Language: Scala
 */
def subsets(nums: List[Int]): List[List[Int]] =
  nums.foldLeft(List(List.empty[Int])) { (acc, n) =>
    acc ++ acc.map(n :: _)
  }
