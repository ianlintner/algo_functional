{-
  Problem 143: Coin Change (LeetCode 322)
  Difficulty: Med
  Language: Haskell
-}
coinChange :: [Int] -> Int -> Int
coinChange coins amount =
  let inf = amount + 1
      dp = [if i == 0 then 0 else inf | i <- [0..amount]]
      update table coin =
        [if i >= coin then min (table !! i) (table !! (i - coin) + 1)
         else table !! i | i <- [0..amount]]
      result = foldl update dp coins
  in if result !! amount >= inf then -1 else result !! amount
