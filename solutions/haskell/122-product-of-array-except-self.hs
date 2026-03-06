{-
  Problem 122: Product of Array Except Self (LeetCode 238)
  Difficulty: Med
  Language: Haskell
-}
productExceptSelf :: [Int] -> [Int]
productExceptSelf nums =
  let prefix = scanl (*) 1 nums
      suffix = scanr (*) 1 nums
  in zipWith (*) (init prefix) (tail suffix)
