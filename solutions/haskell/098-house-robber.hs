{-
  Problem 98: House Robber (LeetCode 198)
  Difficulty: Med
  Language: Haskell
-}
rob :: [Int] -> Int
rob = fst . foldl (\(prev1, prev2) n -> (max prev1 (prev2 + n), prev1)) (0, 0)
