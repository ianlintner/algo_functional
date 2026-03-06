{-
  Problem 95: Rotate Array (LeetCode 189)
  Difficulty: Med
  Language: Haskell
-}
rotate :: [a] -> Int -> [a]
rotate xs k = let n = length xs
                  s = k \`mod\` n
              in drop (n - s) xs ++ take (n - s) xs
