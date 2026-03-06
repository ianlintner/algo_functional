{-
  Problem 127: Meeting Rooms II (LeetCode 253)
  Difficulty: Med
  Language: Haskell
-}
import Data.List (sort)

minMeetingRooms :: [(Int, Int)] -> Int
minMeetingRooms intervals =
  let starts = sort (map fst intervals)
      ends = sort (map snd intervals)
      go [] _ rooms maxR = maxR
      go (s:ss) (e:es) rooms maxR
        | s < e = go ss (e:es) (rooms + 1) (max maxR (rooms + 1))
        | otherwise = go ss es rooms maxR
  in go starts ends 0 0
