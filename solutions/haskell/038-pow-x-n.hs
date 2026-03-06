{-
  Problem 38: Pow(x, n) (LeetCode 50)
  Difficulty: Med
  Language: Haskell
-}
myPow :: Double -> Int -> Double
myPow _ 0 = 1
myPow x n
  | n < 0     = myPow (1 / x) (-n)
  | even n    = myPow (x * x) (n `div` 2)
  | otherwise = x * myPow (x * x) (n `div` 2)
