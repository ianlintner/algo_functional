{-
  Problem 47: Rotate List (LeetCode 61)
  Difficulty: Med
  Language: Haskell
-}
rotateRight :: [a] -> Int -> [a]
rotateRight [] _ = []
rotateRight xs k =
  let n = length xs
      rot = k `mod` n
  in drop (n - rot) xs ++ take (n - rot) xs
