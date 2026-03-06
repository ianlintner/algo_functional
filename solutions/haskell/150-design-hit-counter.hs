{-
  Problem 150: Design Hit Counter (LeetCode 362)
  Difficulty: Med
  Language: Haskell
-}
type HitCounter = [Int]

hit :: HitCounter -> Int -> HitCounter
hit hc ts = hc ++ [ts]

getHits :: HitCounter -> Int -> (Int, HitCounter)
getHits hc ts =
  let filtered = filter (> ts - 300) hc
  in (length filtered, filtered)
