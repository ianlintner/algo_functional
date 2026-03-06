{-
  Problem 80: Single Number (LeetCode 136)
  Difficulty: Easy
  Language: Haskell
-}
import Data.Bits (xor)
singleNumber :: [Int] -> Int
singleNumber = foldl xor 0
