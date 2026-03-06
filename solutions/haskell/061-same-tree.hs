{-
  Problem 61: Same Tree (LeetCode 100)
  Difficulty: Easy
  Language: Haskell
-}
data Tree a = Nil | Node a (Tree a) (Tree a) deriving Eq

sameTree :: Eq a => Tree a -> Tree a -> Bool
sameTree Nil Nil = True
sameTree (Node v1 l1 r1) (Node v2 l2 r2) =
  v1 == v2 && sameTree l1 l2 && sameTree r1 r2
sameTree _ _ = False
