{-
  Problem 62: Symmetric Tree (LeetCode 101)
  Difficulty: Easy
  Language: Haskell
-}
isSymmetric :: Eq a => Tree a -> Bool
isSymmetric Nil = True
isSymmetric (Node _ l r) = mirror l r
  where
    mirror Nil Nil = True
    mirror (Node v1 l1 r1) (Node v2 l2 r2) =
      v1 == v2 && mirror l1 r2 && mirror r1 l2
    mirror _ _ = False
