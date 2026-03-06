{-
  Problem 93: Largest Number (LeetCode 179)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sortBy)

largestNumber :: [Int] -> String
largestNumber nums =
  let strs = map show nums
      cmp a b = compare (b ++ a) (a ++ b)
      res = concatMap id (sortBy cmp strs)
  in if head res == '0' then "0" else res
