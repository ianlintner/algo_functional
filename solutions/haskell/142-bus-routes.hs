{-
  Problem 142: Bus Routes (LeetCode 815)
  Difficulty: Hard
  Language: Haskell
-}
import qualified Data.Map.Strict as Map
import qualified Data.Set as Set

numBusesToDest :: [[Int]] -> Int -> Int -> Int
numBusesToDest routes source target
  | source == target = 0
  | otherwise =
    let stopToRoutes = foldl (\m (ri, stops) ->
          foldl (\m2 s -> Map.insertWith (++) s [ri] m2) m stops)
          Map.empty (zip [0..] routes)
        bfs [] _ _ _ = -1
        bfs queue buses visited vRoutes =
          if any (== target) (map fst queue) then buses
          else
            let (nextQ, vis', vr') = foldl (\(nq, v, vr) (stop, _) ->
                  let ris = filter (\r -> not (Set.member r vr))
                            (Map.findWithDefault [] stop stopToRoutes)
                      vr2 = foldl (flip Set.insert) vr ris
                      newStops = concatMap (\ri -> filter (\s -> not (Set.member s v))
                                  (routes !! ri)) ris
                      v2 = foldl (flip Set.insert) v newStops
                  in (nq ++ map (\s -> (s, ())) newStops, v2, vr2))
                  ([], visited, vRoutes) queue
            in bfs nextQ (buses + 1) vis' vr'
    in bfs [(source, ())] 0 (Set.singleton source) Set.empty
