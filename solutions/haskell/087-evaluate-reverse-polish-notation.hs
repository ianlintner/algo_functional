{-
  Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
  Difficulty: Med
  Language: Haskell
-}
evalRPN :: [String] -> Int
evalRPN = head . foldl step []
  where
    step (b:a:rest) "+" = (a + b) : rest
    step (b:a:rest) "-" = (a - b) : rest
    step (b:a:rest) "*" = (a * b) : rest
    step (b:a:rest) "/" = (a \`quot\` b) : rest
    step stack n        = read n : stack
