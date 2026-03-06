{-
  Problem 51: Set Matrix Zeroes (LeetCode 73)
  Difficulty: Med
  Language: Haskell
-}
setZeroes :: [[Int]] -> [[Int]]
setZeroes matrix =
  let rows = length matrix
      cols = length (head matrix)
      zeroR = [i | (i, row) <- zip [0..] matrix, 0 `elem` row]
      zeroC = [j | j <- [0..cols-1], any (\row -> row !! j == 0) matrix]
      zSet = foldr (\x s -> x : s) [] zeroR
      cSet = foldr (\x s -> x : s) [] zeroC
  in [[ if i `elem` zSet || j `elem` cSet then 0 else v
       | (j, v) <- zip [0..] row]
      | (i, row) <- zip [0..] matrix]
