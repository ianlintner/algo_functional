{-
  Problem 101: Reverse Linked List (LeetCode 206)
  Difficulty: Easy
  Language: Haskell
-}
reverseList :: [a] -> [a]
reverseList = foldl (flip (:)) []
-- For linked list nodes:
-- reverse' Nil acc = acc
-- reverse' (Node v next) acc = reverse' next (Node v acc)
