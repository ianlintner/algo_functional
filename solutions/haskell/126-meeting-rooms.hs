{-
  Problem 126: Meeting Rooms (LeetCode 252)
  Difficulty: Easy
  Language: Haskell
-}
import Data.List (sortOn)

canAttendMeetings :: [(Int, Int)] -> Bool
canAttendMeetings intervals =
  let sorted = sortOn fst intervals
  in all (\((_, e), (s, _)) -> e <= s) (zip sorted (tail sorted))
