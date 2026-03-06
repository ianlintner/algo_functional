{-
  Problem 56: Subsets (LeetCode 78)
  Difficulty: Med
  Language: Haskell
-}
subsets :: [a] -> [[a]]
subsets [] = [[]]
subsets (x:xs) =
  let rest = subsets xs
  in rest ++ map (x:) rest
