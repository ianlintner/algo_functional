{-
  Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
  Difficulty: Med
  Language: Haskell
-}
import Data.Map.Strict (Map)
import qualified Data.Map.Strict as Map

countComponents :: Int -> [(Int,Int)] -> Int
countComponents n edges =
  let parent = Map.fromList [(i, i) | i <- [0..n-1]]
      find p x = if Map.findWithDefault x x p == x then (x, p)
                 else let (root, p') = find p (p Map.! x)
                      in (root, Map.insert x root p')
      union (p, cnt) (a, b) =
        let (ra, p1) = find p a
            (rb, p2) = find p1 b
        in if ra == rb then (p2, cnt) else (Map.insert ra rb p2, cnt - 1)
  in snd (foldl union (parent, n) edges)
