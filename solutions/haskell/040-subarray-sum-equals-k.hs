{-
  Problem 40: Subarray Sum Equals K (LeetCode 560)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

subarraySum :: [Int] -> Int -> Int
subarraySum nums k = go nums 0 0 (Map.singleton 0 1)
  where
    go [] _ count _ = count
    go (x:xs) prefSum count prefMap =
      let s = prefSum + x
          c = count + Map.findWithDefault 0 (s - k) prefMap
          m = Map.insertWith (+) s 1 prefMap
      in go xs s c m
