{-
  Problem 107: Word Search II (LeetCode 212)
  Difficulty: Hard
  Language: Haskell
-}
import qualified Data.Map as M
import qualified Data.Set as S

data TN = TN (M.Map Char TN) (Maybe String)
emptyTN :: TN
emptyTN = TN M.empty Nothing

insertTN :: String -> String -> TN -> TN
insertTN [] w (TN m _) = TN m (Just w)
insertTN (c:cs) w (TN m v) =
  TN (M.alter (Just . insertTN cs w . maybe emptyTN id) c m) v

findWords :: [[Char]] -> [String] -> [String]
findWords board words = S.toList found
  where
    trie = foldr (\w t -> insertTN w w t) emptyTN words
    rows = length board; cols = length (head board)
    at r c = (board !! r) !! c
    dfs r c (TN m _) seen found
      | r<0 || r>=rows || c<0 || c>=cols || S.member (r,c) seen = found
      | otherwise = case M.lookup (at r c) m of
          Nothing -> found
          Just next@(TN _ mw) ->
            let f = maybe found (\w -> S.insert w found) mw
                s = S.insert (r,c) seen
            in foldl (\f' (dr,dc) -> dfs (r+dr) (c+dc) next s f')
                     f [(-1,0),(1,0),(0,-1),(0,1)]
    found = foldl (\f (r,c) -> dfs r c trie S.empty f)
                  S.empty [(r,c) | r <- [0..rows-1], c <- [0..cols-1]]
