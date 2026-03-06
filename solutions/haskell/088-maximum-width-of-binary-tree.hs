{-
  Problem 88: Maximum Width of Binary Tree (LeetCode 662)
  Difficulty: Med
  Language: Haskell
-}
data Tree a = Nil | Node a (Tree a) (Tree a)

widthOfBinaryTree :: Tree a -> Integer
widthOfBinaryTree Nil = 0
widthOfBinaryTree root = bfs [(root, 0)] 0
  where
    bfs [] mx = mx
    bfs level mx =
      let w = snd (last level) - snd (head level) + 1
          next = concatMap children level
      in bfs next (max mx w)
    children (Nil, _) = []
    children (Node _ l r, i) =
      [(l, 2*i) | notNil l] ++ [(r, 2*i+1) | notNil r]
    notNil Nil = False
    notNil _   = True
