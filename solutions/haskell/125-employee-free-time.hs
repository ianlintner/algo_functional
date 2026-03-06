{-
  Problem 125: Employee Free Time (LeetCode 759)
  Difficulty: Hard
  Language: Haskell
-}
import Data.List (sortOn)

employeeFreeTime :: [[(Int, Int)]] -> [(Int, Int)]
employeeFreeTime schedules =
  let sorted = sortOn fst (concat schedules)
      merge [] = []
      merge [x] = [x]
      merge ((a,b):(c,d):rest)
        | b >= c = merge ((a, max b d) : rest)
        | otherwise = (a, b) : merge ((c, d) : rest)
      merged = merge sorted
      gaps ((_, e1):(s2, e2):rest)
        | e1 < s2 = (e1, s2) : gaps ((s2, e2) : rest)
        | otherwise = gaps ((s2, e2) : rest)
      gaps _ = []
  in gaps merged
