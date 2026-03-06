{-
  Problem 42: Spiral Matrix (LeetCode 54)
  Difficulty: Med
  Language: Haskell
-}
spiralOrder :: [[Int]] -> [Int]
spiralOrder [] = []
spiralOrder (top:rest) = top ++ spiralOrder (rotate rest)
  where rotate = map reverse . transpose
-- requires: import Data.List (transpose)
