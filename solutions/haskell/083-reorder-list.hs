{-
  Problem 83: Reorder List (LeetCode 143)
  Difficulty: Med
  Language: Haskell
-}
reorderList :: [a] -> [a]
reorderList xs =
  let n = length xs
      mid = n `div` 2
      first = take mid xs
      second = reverse (drop mid xs)
      merge [] bs = bs
      merge as [] = as
      merge (a:as') (b:bs') = a : b : merge as' bs'
  in merge first second
