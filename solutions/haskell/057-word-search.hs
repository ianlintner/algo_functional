{-
  Problem 57: Word Search (LeetCode 79)
  Difficulty: Med
  Language: Haskell
-}
import Data.Set (Set, empty, member, insert)

exist :: [[Char]] -> String -> Bool
exist board word = any (\(r,c) -> dfs r c 0 empty) coords
  where
    rows = length board
    cols = length (head board)
    coords = [(r,c) | r <- [0..rows-1], c <- [0..cols-1]]
    at r c = (board !! r) !! c
    dfs r c i vis
      | i == length word = True
      | r < 0 || r >= rows || c < 0 || c >= cols = False
      | (r,c) \`member\` vis || at r c /= word !! i = False
      | otherwise =
          let vis' = insert (r,c) vis
          in any (\(dr,dc) -> dfs (r+dr) (c+dc) (i+1) vis')
                 [(1,0),(-1,0),(0,1),(0,-1)]
