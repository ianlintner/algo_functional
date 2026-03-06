{-
  Problem 24: 01 Matrix (LeetCode 542)
  Difficulty: Med
  Language: Haskell
-}
import Data.Array

updateMatrix :: [[Int]] -> [[Int]]
updateMatrix mat =
  let rows = length mat
      cols = length (head mat)
      inf = rows + cols
      arr = listArray ((0,0),(rows-1,cols-1))
              [if mat !! r !! c == 0 then 0 else inf | r <- [0..rows-1], c <- [0..cols-1]]
      topLeft = array (bounds arr)
        [ ((r,c), if arr ! (r,c) == 0 then 0
                  else minimum [inf,
                    if r > 0 then topLeft ! (r-1,c) + 1 else inf,
                    if c > 0 then topLeft ! (r,c-1) + 1 else inf])
        | r <- [0..rows-1], c <- [0..cols-1] ]
      botRight = array (bounds arr)
        [ ((r,c), minimum [topLeft ! (r,c),
                    if r < rows-1 then botRight ! (r+1,c) + 1 else inf,
                    if c < cols-1 then botRight ! (r,c+1) + 1 else inf])
        | r <- [rows-1,rows-2..0], c <- [cols-1,cols-2..0] ]
  in [[botRight ! (r,c) | c <- [0..cols-1]] | r <- [0..rows-1]]
