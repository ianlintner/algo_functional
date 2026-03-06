{-
  Problem 8: Palindrome Number (LeetCode 9)
  Difficulty: Easy
  Language: Haskell
-}
isPalindrome :: Int -> Bool
isPalindrome x
  | x < 0    = False
  | otherwise = let s = show x in s == reverse s
