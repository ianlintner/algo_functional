{-
  Problem 34: Trapping Rain Water (LeetCode 42)
  Difficulty: Hard
  Language: Haskell
-}
trap :: [Int] -> Int
trap heights =
  let maxLeft  = scanl1 max heights
      maxRight = scanr1 max heights
      water = zipWith3 (\h l r -> max 0 (min l r - h)) heights maxLeft maxRight
  in sum water
