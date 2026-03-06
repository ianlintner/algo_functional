{-
  Problem 89: Maximum Product Subarray (LeetCode 152)
  Difficulty: Med
  Language: Haskell
-}
maxProduct :: [Int] -> Int
maxProduct (x:xs) = let (best, _, _) = foldl step (x, x, x) xs in best
  where
    step (best, mx, mn) n =
      let hi = maximum [n, mx * n, mn * n]
          lo = minimum [n, mx * n, mn * n]
      in (max best hi, hi, lo)
maxProduct _ = 0
