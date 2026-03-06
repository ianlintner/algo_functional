{-
  Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
  Difficulty: Hard
  Language: Haskell
-}
data Tree = Empty | Node Int Tree Tree

serialize :: Tree -> String
serialize Empty = "null"
serialize (Node v l r) = show v ++ "," ++ serialize l ++ "," ++ serialize r

deserialize :: String -> Tree
deserialize s = fst (build (splitOn "," s))
  where
    build ("null":rest) = (Empty, rest)
    build (x:rest) =
      let val = read x :: Int
          (left, r1) = build rest
          (right, r2) = build r1
      in (Node val left right, r2)
    splitOn _ [] = [""]
    splitOn d (c:cs)
      | [c] == d  = "" : splitOn d cs
      | otherwise = let (h:t) = splitOn d cs in (c:h) : t
