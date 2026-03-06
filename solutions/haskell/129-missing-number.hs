{-
  Problem 129: Missing Number (LeetCode 268)
  Difficulty: Easy
  Language: Haskell
-}
import Data.Bits (xor)

missingNumber :: [Int] -> Int
missingNumber nums =
  foldl xor 0 nums `xor` foldl xor 0 [0..length nums]
