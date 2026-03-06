{-
  Problem 35: Permutations (LeetCode 46)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (delete)

permute :: Eq a => [a] -> [[a]]
permute [] = [[]]
permute xs = concatMap (\x -> map (x:) (permute (delete x xs))) xs
