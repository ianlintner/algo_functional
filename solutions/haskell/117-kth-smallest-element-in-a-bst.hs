{-
  Problem 117: Kth Smallest Element in a BST (LeetCode 230)
  Difficulty: Med
  Language: Haskell
-}
data Tree a = Nil | Node (Tree a) a (Tree a)

kthSmallest :: Tree Int -> Int -> Int
kthSmallest tree k = inorder tree !! (k - 1)
  where
    inorder Nil = []
    inorder (Node l v r) = inorder l ++ [v] ++ inorder r
