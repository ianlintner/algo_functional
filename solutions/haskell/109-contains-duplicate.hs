{-
  Problem 109: Contains Duplicate (LeetCode 217)
  Difficulty: Easy
  Language: Haskell
-}
import qualified Data.Set as S

containsDuplicate :: Ord a => [a] -> Bool
containsDuplicate = go S.empty
  where
    go _ [] = False
    go seen (x:xs)
      | S.member x seen = True
      | otherwise = go (S.insert x seen) xs
