/**
 * Problem 101: Reverse Linked List (LeetCode 206)
 * Difficulty: Easy
 * Language: Scala
 */
def reverseList[A](lst: List[A]): List[A] =
  lst.foldLeft(List.empty[A])((acc, x) => x :: acc)
