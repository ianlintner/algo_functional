{-
  Problem 21: Merge k Sorted Lists (LeetCode 23)
  Difficulty: Hard
  Language: Haskell
-}
mergeKLists :: Ord a => [[a]] -> [a]
mergeKLists = foldl mergeTwoSorted []
  where
    mergeTwoSorted [] ys = ys
    mergeTwoSorted xs [] = xs
    mergeTwoSorted (x:xs) (y:ys)
      | x <= y   = x : mergeTwoSorted xs (y:ys)
      | otherwise = y : mergeTwoSorted (x:xs) ys
