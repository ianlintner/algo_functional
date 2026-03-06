{-
  Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

lengthOfLongestSubstring :: String -> Int
lengthOfLongestSubstring s =
  let (_, _, result) = foldl step (0, Map.empty, 0) (zip [0..] s)
  in result
  where
    step (left, seen, best) (i, c) =
      let newLeft = case Map.lookup c seen of
                      Just j  -> max left (j + 1)
                      Nothing -> left
          newSeen = Map.insert c i seen
          newBest = max best (i - newLeft + 1)
      in (newLeft, newSeen, newBest)
