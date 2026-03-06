{-
  Problem 76: Word Ladder (LeetCode 127)
  Difficulty: Hard
  Language: Haskell
-}
import qualified Data.Set as S
ladderLength :: String -> String -> [String] -> Int
ladderLength begin end wordList
  | not (S.member end dict) = 0
  | otherwise = bfs [(begin, 1)] (S.singleton begin)
  where
    dict = S.fromList wordList
    neighbors w = [take i w ++ [c] ++ drop (i+1) w
                  | i <- [0..length w - 1], c <- ['a'..'z'], c /= w !! i,
                    S.member (take i w ++ [c] ++ drop (i+1) w) dict]
    bfs [] _ = 0
    bfs ((w, d):rest) vis
      | w == end = d
      | otherwise =
          let ns = filter (\n -> not (S.member n vis)) (neighbors w)
              vis' = foldl (flip S.insert) vis ns
          in bfs (rest ++ map (,d+1) ns) vis'
