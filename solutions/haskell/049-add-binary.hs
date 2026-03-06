{-
  Problem 49: Add Binary (LeetCode 67)
  Difficulty: Easy
  Language: Haskell
-}
addBinary :: String -> String -> String
addBinary a b = reverse $ go (reverse a) (reverse b) 0
  where
    go [] [] 0 = []
    go [] [] c = [intToDigit c]
    go xs ys c =
      let (dx, xs') = case xs of { (x:r) -> (digitToInt x, r); [] -> (0,[]) }
          (dy, ys') = case ys of { (y:r) -> (digitToInt y, r); [] -> (0,[]) }
          s = dx + dy + c
      in intToDigit (s `mod` 2) : go xs' ys' (s `div` 2)
