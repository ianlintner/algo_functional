{-
  Problem 131: Encode and Decode Strings (LeetCode 271)
  Difficulty: Med
  Language: Haskell
-}
encode :: [String] -> String
encode = concatMap (\s -> show (length s) ++ "#" ++ s)

decode :: String -> [String]
decode [] = []
decode s =
  let (numStr, rest) = span (/= '#') s
      n = read numStr :: Int
      word = take n (tail rest)
  in word : decode (drop n (tail rest))
