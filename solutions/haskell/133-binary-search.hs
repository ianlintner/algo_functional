{-
  Problem 133: Binary Search (LeetCode 704)
  Difficulty: Easy
  Language: Haskell
-}
binarySearch :: [Int] -> Int -> Int
binarySearch nums target = search 0 (length nums - 1)
  where
    arr = listArray (0, length nums - 1) nums
    search lo hi
      | lo > hi        = -1
      | arr ! mid == target = mid
      | arr ! mid < target  = search (mid + 1) hi
      | otherwise           = search lo (mid - 1)
      where mid = lo + div (hi - lo) 2
