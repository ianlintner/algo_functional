{-
  Problem 7: String to Integer (atoi) (LeetCode 8)
  Difficulty: Med
  Language: Haskell
-}
import Data.Char (isDigit, digitToInt)

myAtoi :: String -> Int
myAtoi s =
  let trimmed = dropWhile (== ' ') s
      (sign, rest) = case trimmed of
        ('-':xs) -> (-1, xs)
        ('+':xs) -> (1, xs)
        xs       -> (1, xs)
      digits = takeWhile isDigit rest
      value = foldl (\acc d -> acc * 10 + digitToInt d) 0 digits
      result = sign * value
      minInt = -(2^31)
      maxInt = 2^31 - 1
  in max minInt (min maxInt result)
