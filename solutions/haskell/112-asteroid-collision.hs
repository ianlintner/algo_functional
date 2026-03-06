{-
  Problem 112: Asteroid Collision (LeetCode 735)
  Difficulty: Med
  Language: Haskell
-}
asteroidCollision :: [Int] -> [Int]
asteroidCollision = reverse . foldl resolve []
  where
    resolve [] a = [a]
    resolve stack@(top:rest) a
      | a > 0 || top < 0 = a : stack
      | top == negate a = rest
      | top < negate a = resolve rest a
      | otherwise = stack
