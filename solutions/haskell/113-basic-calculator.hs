{-
  Problem 113: Basic Calculator (LeetCode 224)
  Difficulty: Hard
  Language: Haskell
-}
import Data.Char (isDigit, digitToInt)

calculate :: String -> Int
calculate = fst . parse . filter (/= ' ')
  where
    parse = go 0 1
    go result sign [] = (result, [])
    go result sign (')':rest) = (result, rest)
    go result sign ('+':rest) = go result 1 rest
    go result sign ('-':rest) = go result (-1) rest
    go result sign ('(':rest) =
      let (val, rest') = parse rest
      in go (result + sign * val) 1 rest'
    go result sign cs =
      let (digits, rest) = span isDigit cs
          num = foldl (\a d -> a * 10 + digitToInt d) 0 digits
      in go (result + sign * num) 1 rest
