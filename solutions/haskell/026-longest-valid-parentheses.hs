{-
  Problem 26: Longest Valid Parentheses (LeetCode 32)
  Difficulty: Hard
  Language: Haskell
-}
longestValidParentheses :: String -> Int
longestValidParentheses s = max (scan s '(' ')') (scan (reverse s) ')' '(')
  where
    scan cs open close = go cs 0 0 0
    go [] _ _ mx = mx
    go (c:cs) l r mx
      | c == open  = let l' = l + 1
                     in if l' == r then go cs l' r (max mx (2 * r))
                        else go cs l' r mx
      | otherwise  = let r' = r + 1
                     in if r' > l then go cs 0 0 mx
                        else if l == r' then go cs l r' (max mx (2 * r'))
                        else go cs l r' mx
