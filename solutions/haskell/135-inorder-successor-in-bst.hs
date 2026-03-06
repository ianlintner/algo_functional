{-
  Problem 135: Inorder Successor in BST (LeetCode 285)
  Difficulty: Med
  Language: Haskell
-}
data Tree a = Empty | Node a (Tree a) (Tree a)

inorderSuccessor :: Ord a => Tree a -> a -> Maybe a
inorderSuccessor Empty _ = Nothing
inorderSuccessor (Node v left right) p
  | v > p     = case inorderSuccessor left p of
                  Nothing -> Just v
                  result  -> result
  | otherwise = inorderSuccessor right p
