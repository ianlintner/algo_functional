{-
  Problem 69: Balanced Binary Tree (LeetCode 110)
  Difficulty: Easy
  Language: Haskell
-}
isBalanced :: Tree a -> Bool
isBalanced = (/= -1) . height
  where
    height Nil = 0
    height (Node _ l r) =
      let lh = height l; rh = height r
      in if lh == -1 || rh == -1 || abs (lh - rh) > 1 then -1
         else 1 + max lh rh
