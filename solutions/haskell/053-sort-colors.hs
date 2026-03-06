{-
  Problem 53: Sort Colors (LeetCode 75)
  Difficulty: Med
  Language: Haskell
-}
sortColors :: [Int] -> [Int]
sortColors nums =
  let counts = foldl (\[r,w,b] n -> case n of
        0 -> [r+1,w,b]; 1 -> [r,w+1,b]; _ -> [r,w,b+1]) [0,0,0] nums
  in concatMap (\(c, n) -> replicate n c) (zip [0,1,2] counts)
