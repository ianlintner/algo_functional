{-
  Problem 75: Valid Palindrome (LeetCode 125)
  Difficulty: Easy
  Language: Haskell
-}
import Data.Char (toLower, isAlphaNum)
isPalindrome :: String -> Bool
isPalindrome s =
  let cleaned = map toLower $ filter isAlphaNum s
  in cleaned == reverse cleaned
