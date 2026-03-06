{-
  Problem 123: Sliding Window Maximum (LeetCode 239)
  Difficulty: Hard
  Language: Haskell
-}
import Data.Sequence (Seq, (|>), ViewL(..), ViewR(..), viewl, viewr, empty)

maxSlidingWindow :: [Int] -> Int -> [Int]
maxSlidingWindow nums k =
  let arr = zip [0..] nums
      step (dq, res) (i, v) =
        let dq1 = case viewl dq of
              (j :< rest) | j <= i - k -> rest
              _ -> dq
            popR d = case viewr d of
              (rest :> j) | nums !! j <= v -> popR rest
              _ -> d
            dq2 = popR dq1 |> i
            res' = if i >= k - 1 then res ++ [nums !! front]
                   else res
            front = case viewl dq2 of (j :< _) -> j
        in (dq2, res')
  in snd $ foldl step (empty, []) arr
