{-
  Problem 44: Merge Intervals (LeetCode 56)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sortBy)
import Data.Ord (comparing)

merge :: [(Int, Int)] -> [(Int, Int)]
merge = foldl go [] . sortBy (comparing fst)
  where
    go [] iv = [iv]
    go acc (s, e)
      | s <= snd (last acc) = init acc ++ [(fst (last acc), max (snd (last acc)) e)]
      | otherwise = acc ++ [(s, e)]
