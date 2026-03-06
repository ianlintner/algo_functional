{-
  Problem 92: Majority Element (LeetCode 169)
  Difficulty: Easy
  Language: Haskell
-}
majorityElement :: [Int] -> Int
majorityElement = fst . foldl step (0, 0)
  where
    step (_, 0) n = (n, 1)
    step (c, k) n = if n == c then (c, k + 1) else (c, k - 1)
