{-
  Problem 159: Longest Palindrome (LeetCode 409)
  Difficulty: Easy
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

longestPalindrome :: String -> Int
longestPalindrome s =
  let freq = foldl (\m ch -> Map.insertWith (+) ch 1 m) Map.empty s
      pairs = Map.foldl (\acc cnt -> acc + (cnt `div` 2) * 2) 0 freq
  in pairs + if pairs < length s then 1 else 0
