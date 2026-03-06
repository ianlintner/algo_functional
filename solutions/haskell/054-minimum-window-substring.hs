{-
  Problem 54: Minimum Window Substring (LeetCode 76)
  Difficulty: Hard
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

minWindow :: String -> String -> String
minWindow s t =
  let need = foldl (\m c -> Map.insertWith (+) c 1 m) Map.empty t
      keys = Map.size need
      go l r have win best
        | r >= length s = best
        | otherwise =
            let c = s !! r
                win' = Map.insertWith (+) c 1 win
                have' = have + if Map.lookup c win' == Map.lookup c need then 1 else 0
                shrink l' h w b
                  | h < keys = (l', h, w, b)
                  | otherwise =
                      let b' = if r - l' + 1 < snd b - fst b then (l', r+1) else b
                          lc = s !! l'
                          w' = Map.adjust (subtract 1) lc w
                          h' = h - if Map.findWithDefault 0 lc w' < Map.findWithDefault 0 lc need then 1 else 0
                      in shrink (l'+1) h' w' b'
                (nl, nh, nw, nb) = shrink l have' win' best
            in go nl (r+1) nh nw nb
      (start, end') = go 0 0 0 Map.empty (0, length s + 1)
  in if end' > length s then "" else take (end' - start) (drop start s)
