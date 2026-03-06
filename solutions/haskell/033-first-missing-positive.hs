{-
  Problem 33: First Missing Positive (LeetCode 41)
  Difficulty: Hard
  Language: Haskell
-}
import qualified Data.Set as Set

firstMissingPositive :: [Int] -> Int
firstMissingPositive nums =
  let s = Set.fromList (filter (> 0) nums)
      go i = if Set.member i s then go (i + 1) else i
  in go 1
