{-
  Problem 12: Longest Common Prefix (LeetCode 14)
  Difficulty: Easy
  Language: Haskell
-}
longestCommonPrefix :: [String] -> String
longestCommonPrefix [] = ""
longestCommonPrefix strs = foldl1 commonPrefix strs
  where
    commonPrefix a b = map fst $ takeWhile (uncurry (==)) $ zip a b
