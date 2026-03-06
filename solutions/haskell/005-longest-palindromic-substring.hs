{-
  Problem 5: Longest Palindromic Substring (LeetCode 5)
  Difficulty: Med
  Language: Haskell
-}
longestPalindrome :: String -> String
longestPalindrome s = foldl findBest "" [0 .. length s - 1]
  where
    expand l r
      | l < 0 || r >= length s || s !! l /= s !! r =
          take (r - l - 1) (drop (l + 1) s)
      | otherwise = expand (l - 1) (r + 1)
    findBest best i =
      let odd  = expand i i
          even = expand i (i + 1)
          candidate = if length odd >= length even then odd else even
      in if length candidate > length best then candidate else best
