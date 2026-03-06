{-
  Problem 68: Task Scheduler (LeetCode 621)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (group, sort, sortBy)
import Data.Ord (Down(..))

leastInterval :: String -> Int -> Int
leastInterval tasks n =
  let freqs = map length . group . sort $ tasks
      maxFreq = maximum freqs
      maxCount = length (filter (== maxFreq) freqs)
  in max (length tasks) ((maxFreq - 1) * (n + 1) + maxCount)
