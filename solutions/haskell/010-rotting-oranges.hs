{-
  Problem 10: Rotting Oranges (LeetCode 994)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as Set

orangesRotting :: [[Int]] -> Int
orangesRotting grid = bfs rotten fresh 0
  where
    rows = length grid
    cols = length (head grid)
    indexed = [ ((r, c), grid !! r !! c) | r <- [0..rows-1], c <- [0..cols-1] ]
    rotten = Set.fromList [ pos | (pos, 2) <- indexed ]
    fresh  = Set.fromList [ pos | (pos, 1) <- indexed ]
    neighbors (r, c) = filter valid [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]
    valid (r, c) = r >= 0 && r < rows && c >= 0 && c < cols

    bfs rot fr time
      | Set.null fr = time
      | Set.null newRotten = -1
      | otherwise = bfs (Set.union rot newRotten) (Set.difference fr newRotten) (time + 1)
      where
        newRotten = Set.fromList
          [ n | r <- Set.toList rot, n <- neighbors r, Set.member n fr ]
