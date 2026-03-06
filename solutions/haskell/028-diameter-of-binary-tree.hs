{-
  Problem 28: Diameter of Binary Tree (LeetCode 543)
  Difficulty: Easy
  Language: Haskell
-}
data Tree a = Nil | Node a (Tree a) (Tree a)

diameterOfBinaryTree :: Tree a -> Int
diameterOfBinaryTree = snd . go
  where
    go Nil = (0, 0)
    go (Node _ l r) =
      let (lh, ld) = go l
          (rh, rd) = go r
      in (1 + max lh rh, maximum [lh + rh, ld, rd])
