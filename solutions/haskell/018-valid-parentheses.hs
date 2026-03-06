{-
  Problem 18: Valid Parentheses (LeetCode 20)
  Difficulty: Easy
  Language: Haskell
-}
isValid :: String -> Bool
isValid s = null $ foldl step [] s
  where
    step stk ch
      | ch \== '(' || ch == '{' || ch == '[' = ch : stk
      | null stk = [ch]
      | matches (head stk) ch = tail stk
      | otherwise = ch : stk
    matches '(' ')' = True
    matches '{' '}' = True
    matches '[' ']' = True
    matches _   _   = False
