{-
  Problem 134: Move Zeroes (LeetCode 283)
  Difficulty: Easy
  Language: Haskell
-}
moveZeroes :: [Int] -> [Int]
moveZeroes xs = filter (/= 0) xs ++ filter (== 0) xs
