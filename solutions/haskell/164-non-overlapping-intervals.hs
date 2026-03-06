{-
  Problem 164: Non-overlapping Intervals (LeetCode 435)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sortBy)
import Data.Ord (comparing)

eraseOverlapIntervals :: [(Int, Int)] -> Int
eraseOverlapIntervals intervals =
  let sorted = sortBy (comparing snd) intervals
      go _ [] = 0
      go end ((s, e):rest)
        | s < end  = 1 + go end rest
        | otherwise = go e rest
  in go (minBound :: Int) sorted
