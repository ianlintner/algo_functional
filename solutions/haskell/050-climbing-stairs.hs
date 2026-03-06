{-
  Problem 50: Climbing Stairs (LeetCode 70)
  Difficulty: Easy
  Language: Haskell
-}
climbStairs :: Int -> Int
climbStairs n = fst $ foldl (\(a, b) _ -> (b, a + b)) (1, 1) [1..n]
