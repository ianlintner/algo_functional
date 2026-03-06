{-
  Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
  Difficulty: Med
  Language: Haskell
-}
buildTree :: Eq a => [a] -> [a] -> Tree a
buildTree [] _ = Nil
buildTree (r:pre) ino =
  let (left, _:right) = break (== r) ino
      n = length left
  in Node r (buildTree (take n pre) left)
            (buildTree (drop n pre) right)
