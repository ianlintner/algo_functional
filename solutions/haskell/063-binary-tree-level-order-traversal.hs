{-
  Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
  Difficulty: Med
  Language: Haskell
-}
levelOrder :: Tree a -> [[a]]
levelOrder Nil = []
levelOrder root = bfs [root]
  where
    bfs [] = []
    bfs level =
      let vals = map nodeVal level
          next = concatMap children level
      in vals : bfs next
    nodeVal (Node v _ _) = v
    children (Node _ l r) = [x | x <- [l, r], notNil x]
    notNil Nil = False
    notNil _ = True
