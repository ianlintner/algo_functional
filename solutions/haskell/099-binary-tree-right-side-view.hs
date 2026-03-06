{-
  Problem 99: Binary Tree Right Side View (LeetCode 199)
  Difficulty: Med
  Language: Haskell
-}
data Tree a = Nil | Node a (Tree a) (Tree a)

rightSideView :: Tree Int -> [Int]
rightSideView Nil = []
rightSideView root = bfs [root]
  where
    bfs [] = []
    bfs level = val (last level) : bfs next
      where
        next = concatMap children level
        children Nil = []
        children (Node _ l r) = filter notNil [l, r]
        val (Node v _ _) = v
        notNil Nil = False
        notNil _   = True
