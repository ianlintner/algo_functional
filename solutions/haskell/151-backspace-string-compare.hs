{-
  Problem 151: Backspace String Compare (LeetCode 844)
  Difficulty: Easy
  Language: Haskell
-}
backspaceCompare :: String -> String -> Bool
backspaceCompare s t = build s == build t
  where build = foldl (\acc ch -> if ch == '#' then init' acc else acc ++ [ch]) ""
        init' [] = []
        init' xs = init xs
