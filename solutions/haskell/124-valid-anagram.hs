{-
  Problem 124: Valid Anagram (LeetCode 242)
  Difficulty: Easy
  Language: Haskell
-}
import Data.List (sort)

isAnagram :: String -> String -> Bool
isAnagram s t = sort s == sort t
