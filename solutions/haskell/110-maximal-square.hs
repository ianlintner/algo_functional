{-
  Problem 110: Maximal Square (LeetCode 221)
  Difficulty: Med
  Language: Haskell
-}
maximalSquare :: [[Char]] -> Int
maximalSquare [] = 0
maximalSquare mat =
  let cols = length (head mat)
      buildRow r prev row = reverse $ snd $
        foldl (\(c, acc) cell ->
          let v = if cell == '0' then 0
                  else if r == 0 || c == 0 then 1
                  else minimum [prev !! (c-1), prev !! c,
                                if null acc then 0 else head acc] + 1
          in (c+1, v : acc)) (0, []) row
      (mx, _) = foldl (\(best, prev) (r, row) ->
        let curr = buildRow r prev row
        in (max best (foldl max 0 curr), curr))
        (0, replicate cols 0) (zip [0..] mat)
  in mx * mx
