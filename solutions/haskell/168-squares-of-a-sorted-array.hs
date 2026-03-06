{-
  Problem 168: Squares of a Sorted Array (LeetCode 977)
  Difficulty: Easy
  Language: Haskell
-}
sortedSquares :: [Int] -> [Int]
sortedSquares nums =
  let arr = listArray (0, length nums - 1) nums
      merge l r
        | l > r = []
        | abs (arr ! l) >= abs (arr ! r) =
            (arr ! l)^2 : merge (l+1) r
        | otherwise = (arr ! r)^2 : merge l (r-1)
  in reverse $ merge 0 (length nums - 1)

-- uses Data.Array
