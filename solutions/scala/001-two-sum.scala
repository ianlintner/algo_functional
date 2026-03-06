/**
 * Problem 1: Two Sum (LeetCode 1)
 * Difficulty: Easy
 * Language: Scala
 */
def twoSum(nums: Array[Int], target: Int): Array[Int] = {
  nums.zipWithIndex.foldLeft(Map.empty[Int, Int]) {
    case (map, (num, i)) =>
      val complement = target - num
      map.get(complement) match {
        case Some(j) => return Array(j, i)
        case None    => map + (num -> i)
      }
  }
  Array.empty
}
