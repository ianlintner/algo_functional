{-
  Problem 128: Graph Valid Tree (LeetCode 261)
  Difficulty: Med
  Language: Haskell
-}
import Data.Map.Strict (Map, fromListWith, findWithDefault)
import Data.Set (Set, empty, insert, member, size)

validTree :: Int -> [(Int, Int)] -> Bool
validTree n edges
  | length edges /= n - 1 = False
  | otherwise = size (dfs 0 empty) == n
  where
    adj = fromListWith (++) $
      concatMap (\(u,v) -> [(u,[v]), (v,[u])]) edges
    dfs node visited
      | member node visited = visited
      | otherwise = foldl (flip dfs) (insert node visited)
          (findWithDefault [] node adj)
