{-
  Problem 4: Median of Two Sorted Arrays (LeetCode 4)
  Difficulty: Hard
  Language: Haskell
-}
import Data.List (sort)

findMedianSortedArrays :: [Int] -> [Int] -> Double
findMedianSortedArrays nums1 nums2 =
  let merged = sort (nums1 ++ nums2)
      n = length merged
      mid = n `div` 2
  in if even n
     then fromIntegral (merged !! (mid - 1) + merged !! mid) / 2.0
     else fromIntegral (merged !! mid)
