{-
  Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
  Difficulty: Med
  Language: Haskell
-}
data BST = BNil | BNode BST Int BST

lcaBST :: BST -> Int -> Int -> Maybe Int
lcaBST BNil _ _ = Nothing
lcaBST (BNode l v r) p q
  | p < v && q < v = lcaBST l p q
  | p > v && q > v = lcaBST r p q
  | otherwise = Just v
