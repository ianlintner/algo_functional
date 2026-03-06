{-
  Problem 86: Sort List (LeetCode 148)
  Difficulty: Med
  Language: Haskell
-}
sortList :: [Int] -> [Int]
sortList [] = []
sortList [x] = [x]
sortList xs = merge (sortList l) (sortList r)
  where (l, r) = splitAt (length xs \`div\` 2) xs
        merge [] b = b
        merge a [] = a
        merge (a:as') (b:bs')
          | a <= b   = a : merge as' (b:bs')
          | otherwise = b : merge (a:as') bs'
