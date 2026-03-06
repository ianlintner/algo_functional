{-
  Problem 82: Linked List Cycle (LeetCode 141)
  Difficulty: Easy
  Language: Haskell
-}
-- Floyd's cycle detection via set tracking (pure)
import qualified Data.Set as S
hasCycle :: Eq a => [a] -> Int -> Bool
hasCycle nodes startIdx = go startIdx S.empty
  where
    go idx visited
      | idx < 0 || idx >= length nodes = False
      | S.member idx visited = True
      | otherwise = go (nextOf idx) (S.insert idx visited)
