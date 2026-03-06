{-
  Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
  Difficulty: Easy
  Language: Haskell
-}
maxProfit :: [Int] -> Int
maxProfit [] = 0
maxProfit (p:ps) = snd $ foldl (\(mn, mx) x -> (min mn x, max mx (x - mn))) (p, 0) ps
