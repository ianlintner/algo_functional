{-
  Problem 46: Subtree of Another Tree (LeetCode 572)
  Difficulty: Easy
  Language: Haskell
-}
data Tree a = Nil | Node a (Tree a) (Tree a) deriving (Eq)

isSubtree :: Eq a => Tree a -> Tree a -> Bool
isSubtree Nil sub = sub == Nil
isSubtree t@(Node _ l r) sub =
  t == sub || isSubtree l sub || isSubtree r sub
