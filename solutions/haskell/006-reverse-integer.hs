{-
  Problem 6: Reverse Integer (LeetCode 7)
  Difficulty: Med
  Language: Haskell
-}
reverseInteger :: Int -> Int
reverseInteger x =
  let sign = if x < 0 then -1 else 1
      digits = show (abs x)
      reversed = sign * read (reverse digits)
      maxInt = 2^31 - 1
      minInt = -(2^31)
  in if reversed > maxInt || reversed < minInt then 0 else reversed
