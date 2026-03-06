{-
  Problem 114: Invert Binary Tree (LeetCode 226)
  Difficulty: Easy
  Language: Haskell
-}
data Tree a = Empty | Node a (Tree a) (Tree a)

invertTree :: Tree a -> Tree a
invertTree Empty = Empty
invertTree (Node v l r) = Node v (invertTree r) (invertTree l)
