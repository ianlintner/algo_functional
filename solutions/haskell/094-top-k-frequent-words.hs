{-
  Problem 94: Top K Frequent Words (LeetCode 692)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sortBy, group, sort)
import Data.Ord (Down(..))

topKFrequent :: [String] -> Int -> [String]
topKFrequent words k =
  take k
  . map snd
  . sortBy (\(c1,w1) (c2,w2) -> compare (Down c1, w1) (Down c2, w2))
  . map (\g -> (length g, head g))
  . group
  . sort
  $ words
