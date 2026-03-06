{-
  Problem 78: Clone Graph (LeetCode 133)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map as M
data GNode = GNode Int [GNode]
cloneGraph :: GNode -> M.Map Int GNode -> (GNode, M.Map Int GNode)
cloneGraph (GNode v nbrs) visited
  | M.member v visited = (visited M.! v, visited)
  | otherwise =
      let placeholder = GNode v []
          vis' = M.insert v placeholder visited
          (clonedNbrs, vis'') = foldl (\(acc, vs) n ->
            let (cn, vs') = cloneGraph n vs in (acc ++ [cn], vs'))
            ([], vis') nbrs
      in (GNode v clonedNbrs, vis'')
