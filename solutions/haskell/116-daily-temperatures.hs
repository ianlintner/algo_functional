{-
  Problem 116: Daily Temperatures (LeetCode 739)
  Difficulty: Med
  Language: Haskell
-}
dailyTemperatures :: [Int] -> [Int]
dailyTemperatures temps = reverse $ snd $ foldl step ([], []) (zip [0..] temps)
  where
    step (stack, res) (i, t) =
      let stack' = dropWhile (\(_, st) -> st <= t) stack
          val = case stack' of { [] -> 0; ((j,_):_) -> j - i }
      in ((i, t) : stack', val : res)
-- Note: uses left fold processing reversed input for stack approach
