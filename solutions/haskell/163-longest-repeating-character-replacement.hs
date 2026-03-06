{-
  Problem 163: Longest Repeating Character Replacement (LeetCode 424)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

characterReplacement :: String -> Int -> Int
characterReplacement s k =
  let go _ _ _ best [] = best
      go left maxC freq best (c:rest) =
        let freq' = Map.insertWith (+) c 1 freq
            mc = max maxC (freq' Map.! c)
            right = length s - length rest
            wLen = right - left
        in if wLen - mc > k
           then let lc = s !! left
                    freq'' = Map.adjust (subtract 1) lc freq'
                in go (left+1) mc freq'' (max best (wLen - 1)) rest
           else go left mc freq' (max best wLen) rest
  in go 0 0 Map.empty 0 s
