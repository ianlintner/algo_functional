{-
  Problem 155: Ransom Note (LeetCode 383)
  Difficulty: Easy
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

canConstruct :: String -> String -> Bool
canConstruct note mag =
  let freq = foldl (\m ch -> Map.insertWith (+) ch 1 m) Map.empty mag
      (_, valid) = foldl (\(m, ok) ch ->
        let cnt = Map.findWithDefault 0 ch m
        in (Map.insert ch (cnt - 1) m, ok && cnt > 0)) (freq, True) note
  in valid
