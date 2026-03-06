{-
  Problem 45: Insert Interval (LeetCode 57)
  Difficulty: Med
  Language: Haskell
-}
insert :: [(Int,Int)] -> (Int,Int) -> [(Int,Int)]
insert intervals new = foldl go [] (sortBy (comparing fst) (new : intervals))
  where
    go [] iv = [iv]
    go acc (s, e)
      | s <= snd (last acc) = init acc ++ [(fst (last acc), max (snd (last acc)) e)]
      | otherwise = acc ++ [(s, e)]
