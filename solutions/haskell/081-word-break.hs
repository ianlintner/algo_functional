{-
  Problem 81: Word Break (LeetCode 139)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as S
wordBreak :: String -> [String] -> Bool
wordBreak s dict =
  let ds = S.fromList dict
      n = length s
      dp = map (\i -> i == 0 || any (\j -> dp !! j &&
           S.member (take (i - j) (drop j s)) ds) [0..i-1]) [0..n]
  in dp !! n
