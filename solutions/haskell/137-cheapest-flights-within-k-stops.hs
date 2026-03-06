{-
  Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
  Difficulty: Med
  Language: Haskell
-}
import Data.Array

findCheapestPrice :: Int -> [(Int,Int,Int)] -> Int -> Int -> Int -> Int
findCheapestPrice n flights src dst k =
  let inf = maxBound :: Int
      init = listArray (0, n-1) [if i == src then 0 else inf | i <- [0..n-1]]
      relax prices = foldl (\arr (u,v,w) ->
        if prices ! u < inf && prices ! u + w < arr ! v
        then arr // [(v, prices ! u + w)]
        else arr) prices flights
      final = iterate relax init !! (k + 1)
  in if final ! dst == inf then -1 else final ! dst
