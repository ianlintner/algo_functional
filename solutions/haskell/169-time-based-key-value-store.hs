{-
  Problem 169: Time Based Key-Value Store (LeetCode 981)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

type TimeMap = Map.Map String [(Int, String)]

empty :: TimeMap
empty = Map.empty

set :: String -> String -> Int -> TimeMap -> TimeMap
set key value ts tm =
  Map.insertWith (++) key [(ts, value)] tm

get :: String -> Int -> TimeMap -> String
get key ts tm =
  case Map.lookup key tm of
    Nothing -> ""
    Just entries ->
      let sorted = reverse entries
          bsearch [] = ""
          bsearch ((t, v):rest)
            | t <= ts   = v
            | otherwise = bsearch rest
      in bsearch sorted
