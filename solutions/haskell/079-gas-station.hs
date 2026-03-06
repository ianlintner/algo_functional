{-
  Problem 79: Gas Station (LeetCode 134)
  Difficulty: Med
  Language: Haskell
-}
canCompleteCircuit :: [Int] -> [Int] -> Int
canCompleteCircuit gas cost =
  let diffs = zipWith (-) gas cost
      (total, _, start) = foldl (\(tot, tank, s) (d, i) ->
        let tot' = tot + d; tank' = tank + d
        in if tank' < 0 then (tot', 0, i + 1) else (tot', tank', s))
        (0, 0, 0) (zip diffs [0..])
  in if total >= 0 then start else -1
