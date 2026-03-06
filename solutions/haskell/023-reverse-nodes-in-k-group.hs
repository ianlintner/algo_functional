{-
  Problem 23: Reverse Nodes in k-Group (LeetCode 25)
  Difficulty: Hard
  Language: Haskell
-}
reverseKGroup :: [a] -> Int -> [a]
reverseKGroup xs k
  | length group < k = xs
  | otherwise = reverse group ++ reverseKGroup rest k
  where
    (group, rest) = splitAt k xs
