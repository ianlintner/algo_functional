{-
  Problem 41: Maximum Subarray (LeetCode 53)
  Difficulty: Med
  Language: Haskell
-}
maxSubArray :: [Int] -> Int
maxSubArray [] = error "empty"
maxSubArray (x:xs) =
  fst $ foldl (\(best, cur) n ->
    let cur' = max n (cur + n)
    in (max best cur', cur')) (x, x) xs
