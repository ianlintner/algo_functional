{-
  Problem 152: Combination Sum IV (LeetCode 377)
  Difficulty: Med
  Language: Haskell
-}
combinationSum4 :: [Int] -> Int -> Int
combinationSum4 nums target =
  let dp = foldl (\dp i ->
        dp ++ [sum [dp !! (i - n) | n <- nums, n <= i]]
      ) [1] [1..target]
  in dp !! target
