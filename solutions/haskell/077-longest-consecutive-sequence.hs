{-
  Problem 77: Longest Consecutive Sequence (LeetCode 128)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as S
longestConsecutive :: [Int] -> Int
longestConsecutive nums =
  let s = S.fromList nums
      countFrom x = if S.member x s then 1 + countFrom (x+1) else 0
  in S.foldl' (\mx n -> if S.member (n-1) s then mx else max mx (countFrom n)) 0 s
