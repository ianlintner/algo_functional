{-
  Problem 31: Shortest Path to Get Food (LeetCode 1730)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as Set
import Data.Array

getFood :: [[Char]] -> Int
getFood grid = bfs [(sr, sc, 0)] (Set.singleton (sr, sc))
  where
    rows = length grid
    cols = length (head grid)
    arr  = listArray ((0,0),(rows-1,cols-1))
           [grid !! i !! j | i <- [0..rows-1], j <- [0..cols-1]]
    (sr, sc) = head [(i,j) | i <- [0..rows-1], j <- [0..cols-1], arr ! (i,j) == '*']
    dirs = [(0,1),(0,-1),(1,0),(-1,0)]
    bfs [] _ = -1
    bfs queue vis =
      let step [] vis' next = bfs next vis'
          step ((r,c,d):rest) vis' next =
            let neighbors = [(r+dr, c+dc, d+1) | (dr,dc) <- dirs,
                             let nr = r+dr, let nc = c+dc,
                             nr >= 0, nr < rows, nc >= 0, nc < cols,
                             arr ! (nr,nc) /= 'X',
                             not (Set.member (nr,nc) vis')]
                found = filter (\(nr,nc,_) -> arr ! (nr,nc) == '#') neighbors
            in case found of
                 ((_, _, dist):_) -> dist
                 [] -> step rest
                        (foldl (\s (nr,nc,_) -> Set.insert (nr,nc) s) vis' neighbors)
                        (next ++ neighbors)
      in step queue vis []
