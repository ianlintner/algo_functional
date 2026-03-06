{-
  Problem 108: Kth Largest Element in an Array (LeetCode 215)
  Difficulty: Med
  Language: Haskell
-}
findKthLargest :: Ord a => [a] -> Int -> a
findKthLargest xs k =
  let pivot = xs !! (length xs `div` 2)
      hi = filter (> pivot) xs
      eq = filter (== pivot) xs
      lo = filter (< pivot) xs
  in if k <= length hi then findKthLargest hi k
     else if k <= length hi + length eq then pivot
     else findKthLargest lo (k - length hi - length eq)
