{-
  Problem 119: Palindrome Linked List (LeetCode 234)
  Difficulty: Easy
  Language: Haskell
-}
isPalindromeList :: Eq a => [a] -> Bool
isPalindromeList xs = xs == reverse xs
