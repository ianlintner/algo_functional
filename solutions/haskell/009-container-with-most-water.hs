{-
  Problem 9: Container With Most Water (LeetCode 11)
  Difficulty: Med
  Language: Haskell
-}
import Data.Vector (Vector, (!))
import qualified Data.Vector as V

maxArea :: Vector Int -> Int
maxArea height = go 0 (V.length height - 1) 0
  where
    go l r best
      | l >= r    = best
      | otherwise =
          let area = min (height ! l) (height ! r) * (r - l)
              newBest = max best area
          in if height ! l < height ! r
             then go (l + 1) r newBest
             else go l (r - 1) newBest
