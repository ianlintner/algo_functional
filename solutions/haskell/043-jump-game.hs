{-
  Problem 43: Jump Game (LeetCode 55)
  Difficulty: Med
  Language: Haskell
-}
canJump :: [Int] -> Bool
canJump nums =
  foldl (\reach (i, n) ->
    if i > reach then -1 else max reach (i + n)
  ) 0 (zip [0..] nums) >= length nums - 1
