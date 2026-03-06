{-
  Problem 149: Counting Bits (LeetCode 338)
  Difficulty: Easy
  Language: Haskell
-}
countBits :: Int -> [Int]
countBits n = foldl (\dp i ->
  dp ++ [if i == 0 then 0 else (dp !! (i `div` 2)) + (i `mod` 2)]
  ) [] [0..n]
