{-
  Problem 91: Min Stack (LeetCode 155)
  Difficulty: Med
  Language: Haskell
-}
type MinStack = [(Int, Int)]  -- (value, currentMin)

push :: MinStack -> Int -> MinStack
push [] x = [(x, x)]
push s@((_, m):_) x = (x, min x m) : s

pop :: MinStack -> MinStack
pop = tail

top :: MinStack -> Int
top = fst . head

getMin :: MinStack -> Int
getMin = snd . head
