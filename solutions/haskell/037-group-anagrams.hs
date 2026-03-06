{-
  Problem 37: Group Anagrams (LeetCode 49)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sort, groupBy, sortBy)
import Data.Ord (comparing)

groupAnagrams :: [String] -> [[String]]
groupAnagrams strs =
  map (map snd) .
  groupBy (\a b -> fst a == fst b) .
  sortBy (comparing fst) $
  map (\s -> (sort s, s)) strs
