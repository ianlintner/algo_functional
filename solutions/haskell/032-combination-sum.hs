{-
  Problem 32: Combination Sum (LeetCode 39)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sort)

combinationSum :: [Int] -> Int -> [[Int]]
combinationSum candidates target = go (sort candidates) target []
  where
    go [] _ _ = []
    go _ 0 curr = [reverse curr]
    go (c:cs) rem curr
      | c > rem   = []
      | otherwise = go (c:cs) (rem - c) (c : curr) ++ go cs rem curr
