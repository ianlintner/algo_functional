{-
  Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
  Difficulty: Hard
  Language: Haskell
-}
maxPathSum :: Tree Int -> Int
maxPathSum t = snd (go t)
  where
    go Nil = (0, minBound)
    go (Node v l r) =
      let (lg, lm) = go l
          (rg, rm) = go r
          gain = max 0 (v + max lg rg)
          pathMax = maximum [lm, rm, v + lg + rg]
      in (gain, pathMax)
