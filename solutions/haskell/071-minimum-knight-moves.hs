{-
  Problem 71: Minimum Knight Moves (LeetCode 1197)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as S
minKnightMoves :: Int -> Int -> Int
minKnightMoves x y = bfs [(0,0,0)] S.empty
  where
    tx = abs x; ty = abs y
    moves = [(1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2)]
    bfs [] _ = -1
    bfs ((cx,cy,d):rest) vis
      | cx == tx && cy == ty = d
      | otherwise =
          let nexts = [(cx+dx,cy+dy,d+1) | (dx,dy) <- moves,
                       cx+dx >= -2, cy+dy >= -2,
                       S.notMember (cx+dx,cy+dy) vis]
              vis' = foldl (\s (a,b,_) -> S.insert (a,b) s) vis nexts
          in bfs (rest ++ nexts) vis'
