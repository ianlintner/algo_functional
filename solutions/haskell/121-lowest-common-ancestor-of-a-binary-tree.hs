{-
  Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
  Difficulty: Med
  Language: Haskell
-}
data BTree a = BLeaf | BNode (BTree a) a (BTree a) deriving Eq

lca :: Eq a => BTree a -> a -> a -> Maybe a
lca BLeaf _ _ = Nothing
lca (BNode l v r) p q
  | v == p || v == q = Just v
  | otherwise = case (lca l p q, lca r p q) of
      (Just _, Just _) -> Just v
      (Just x, Nothing) -> Just x
      (Nothing, Just x) -> Just x
      _ -> Nothing
