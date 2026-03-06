{-
  Problem 60: Validate Binary Search Tree (LeetCode 98)
  Difficulty: Med
  Language: Haskell
-}
data Tree a = Nil | Node a (Tree a) (Tree a)

isValidBST :: (Ord a) => Tree a -> Bool
isValidBST = go Nothing Nothing
  where
    go _ _ Nil = True
    go lo hi (Node v l r) =
      maybe True (< v) lo &&
      maybe True (v <) hi &&
      go lo (Just v) l &&
      go (Just v) hi r
