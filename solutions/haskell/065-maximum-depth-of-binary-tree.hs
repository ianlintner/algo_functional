{-
  Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
  Difficulty: Easy
  Language: Haskell
-}
maxDepth :: Tree a -> Int
maxDepth Nil = 0
maxDepth (Node _ l r) = 1 + max (maxDepth l) (maxDepth r)
