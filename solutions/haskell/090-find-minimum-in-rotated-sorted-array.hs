{-
  Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
  Difficulty: Med
  Language: Haskell
-}
findMin :: [Int] -> Int
findMin xs = go 0 (length xs - 1)
  where
    v = (xs !!)
    go lo hi
      | lo == hi  = v lo
      | v mid > v hi = go (mid + 1) hi
      | otherwise = go lo mid
      where mid = (lo + hi) \`div\` 2
