{-
  Problem 48: Unique Paths (LeetCode 62)
  Difficulty: Med
  Language: Haskell
-}
uniquePaths :: Int -> Int -> Int
uniquePaths m n =
  let k = min (m-1) (n-1)
  in foldl (\acc i -> acc * (m + n - 2 - i) `div` (i + 1)) 1 [0..k-1]
