{-
  Problem 160: Partition Equal Subset Sum (LeetCode 416)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as Set

canPartition :: [Int] -> Bool
canPartition nums =
  let total = sum nums
      target = total `div` 2
  in if odd total then False
     else Set.member target $
       foldl (\dp n -> Set.union dp (Set.map (+ n) dp)) (Set.singleton 0) nums
