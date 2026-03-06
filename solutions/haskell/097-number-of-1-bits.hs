{-
  Problem 97: Number of 1 Bits (LeetCode 191)
  Difficulty: Easy
  Language: Haskell
-}
import Data.Bits

hammingWeight :: Int -> Int
hammingWeight 0 = 0
hammingWeight n = (n .&. 1) + hammingWeight (shiftR n 1)
