{-
  Problem 59: Decode Ways (LeetCode 91)
  Difficulty: Med
  Language: Haskell
-}
import Data.Map.Strict (Map, empty, lookup, insert)

numDecodings :: String -> Int
numDecodings s = fst (go 0 empty)
  where
    n = length s
    go i memo
      | i == n = (1, memo)
      | s !! i == '0' = (0, memo)
      | otherwise = case Data.Map.Strict.lookup i memo of
          Just v -> (v, memo)
          Nothing ->
            let (a, m1) = go (i+1) memo
                (b, m2) = if i+1 < n && read (take 2 (drop i s)) <= (26::Int)
                           then go (i+2) m1 else (0, m1)
                res = a + b
            in (res, insert i res m2)
