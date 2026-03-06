{-
  Problem 22: Swap Nodes in Pairs (LeetCode 24)
  Difficulty: Med
  Language: Haskell
-}
swapPairs :: [a] -> [a]
swapPairs [] = []
swapPairs [x] = [x]
swapPairs (x:y:rest) = y : x : swapPairs rest
