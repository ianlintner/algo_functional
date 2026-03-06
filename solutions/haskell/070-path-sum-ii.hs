{-
  Problem 70: Path Sum II (LeetCode 113)
  Difficulty: Med
  Language: Haskell
-}
pathSum :: Tree Int -> Int -> [[Int]]
pathSum Nil _ = []
pathSum (Node v Nil Nil) target
  | v == target = [[v]]
  | otherwise   = []
pathSum (Node v l r) target =
  map (v:) (pathSum l (target - v) ++ pathSum r (target - v))
