{-
  Problem 167: K Closest Points to Origin (LeetCode 973)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sortBy)
import Data.Ord (comparing)

kClosest :: [[Int]] -> Int -> [[Int]]
kClosest points k =
  take k $ sortBy (comparing (\[x, y] -> x*x + y*y)) points
