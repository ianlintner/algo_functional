{-
  Problem 132: First Bad Version (LeetCode 278)
  Difficulty: Easy
  Language: Haskell
-}
firstBadVersion :: (Int -> Bool) -> Int -> Int
firstBadVersion isBad n = search 1 n
  where
    search lo hi
      | lo >= hi  = lo
      | isBad mid = search lo mid
      | otherwise = search (mid + 1) hi
      where mid = lo + div (hi - lo) 2
