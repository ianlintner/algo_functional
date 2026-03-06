{-
  Problem 156: Decode String (LeetCode 394)
  Difficulty: Med
  Language: Haskell
-}
decodeString :: String -> String
decodeString = fst . go
  where
    go [] = ("", [])
    go (']':rest) = ("", rest)
    go (c:rest)
      | c >= '0' && c <= '9' =
        let (numStr, '[':after) = span (\x -> x >= '0' && x <= '9') (c:rest)
            n = read numStr :: Int
            (inner, remaining) = go after
        in let (next, final) = go remaining
           in (concat (replicate n inner) ++ next, final)
      | otherwise = let (next, final) = go rest in (c:next, final)
