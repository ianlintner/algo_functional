{-
  Problem 36: Rotate Image (LeetCode 48)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (transpose)

rotate :: [[a]] -> [[a]]
rotate = map reverse . transpose
