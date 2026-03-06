{-
  Problem 1: Two Sum (LeetCode 1)
  Difficulty: Easy
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

twoSum :: [Int] -> Int -> [Int]
twoSum nums target = go nums 0 Map.empty
  where
    go [] _ _ = []
    go (x:xs) i seen =
      let complement = target - x
      in case Map.lookup complement seen of
           Just j  -> [j, i]
           Nothing -> go xs (i + 1) (Map.insert x i seen)
