{-
  Problem 39: N-Queens (LeetCode 51)
  Difficulty: Hard
  Language: Haskell
-}
import qualified Data.Set as Set

solveNQueens :: Int -> [[String]]
solveNQueens n = map toBoard $ go 0 Set.empty Set.empty Set.empty []
  where
    go row cols d1 d2 board
      | row == n  = [reverse board]
      | otherwise =
          [ result
          | c <- [0..n-1]
          , not (Set.member c cols)
          , not (Set.member (row - c) d1)
          , not (Set.member (row + c) d2)
          , result <- go (row+1) (Set.insert c cols)
                         (Set.insert (row-c) d1) (Set.insert (row+c) d2)
                         (c : board)
          ]
    toBoard = map (\c -> replicate c '.' ++ "Q" ++ replicate (n - c - 1) '.')
