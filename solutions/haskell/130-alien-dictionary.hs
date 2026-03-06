{-
  Problem 130: Alien Dictionary (LeetCode 269)
  Difficulty: Hard
  Language: Haskell
-}
import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map
import Data.Set (Set)
import qualified Data.Set as Set

alienOrder :: [String] -> String
alienOrder words =
  let chars = Set.fromList (concat words)
      edges = concatMap findEdge (zip words (tail words))
      findEdge ([], _) = []
      findEdge (_, []) = []
      findEdge (a:as_, b:bs)
        | a /= b = [(a, b)]
        | otherwise = findEdge (as_, bs)
      graph = foldl (\g (u, v) ->
        Map.insertWith Set.union u (Set.singleton v) g)
        (Map.fromList [(c, Set.empty) | c <- Set.toList chars]) edges
      inDeg = foldl (\m (_, v) -> Map.insertWith (+) v 1 m)
        (Map.fromList [(c, 0) | c <- Set.toList chars]) edges
      topo [] res = res
      topo (c:rest) res =
        let nbs = Set.toList (Map.findWithDefault Set.empty c graph)
            (deg', q') = foldl (\(d, q) n ->
              let d' = Map.adjust (subtract 1) n d
              in if Map.findWithDefault 0 n d' == 0
                 then (d', q ++ [n]) else (d', q))
              (inDeg, rest) nbs
        in topo q' (res ++ [c])
      start = [c | (c, 0) <- Map.toList inDeg]
      result = topo start []
  in if length result == Set.size chars then result else ""
