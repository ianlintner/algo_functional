{-
  Problem 17: Remove Nth Node From End of List (LeetCode 19)
  Difficulty: Med
  Language: Haskell
-}
removeNthFromEnd :: [a] -> Int -> [a]
removeNthFromEnd xs n =
  let len = length xs
      idx = len - n
  in take idx xs ++ drop (idx + 1) xs
