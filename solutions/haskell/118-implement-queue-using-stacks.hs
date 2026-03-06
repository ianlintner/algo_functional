{-
  Problem 118: Implement Queue using Stacks (LeetCode 232)
  Difficulty: Easy
  Language: Haskell
-}
data Queue a = Queue [a] [a] deriving Show

emptyQ :: Queue a
emptyQ = Queue [] []

enqueue :: a -> Queue a -> Queue a
enqueue x (Queue ins outs) = Queue (x : ins) outs

dequeue :: Queue a -> (a, Queue a)
dequeue (Queue ins (o:outs)) = (o, Queue ins outs)
dequeue (Queue ins []) = dequeue (Queue [] (reverse ins))

peekQ :: Queue a -> a
peekQ q = fst (dequeue q)
