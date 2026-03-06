{-
  Problem 166: Find All Anagrams in a String (LeetCode 438)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map.Strict as Map

findAnagrams :: String -> String -> [Int]
findAnagrams s p =
  let pFreq = foldl (\m c -> Map.insertWith (+) c 1 m) Map.empty p
      pLen = length p
      go _ _ [] = []
      go left wFreq chars
        | length (take (pLen + 1) $ drop left s) > pLen =
          let wFreq' = Map.adjust (subtract 1) (s !! left) wFreq
              cleaned = Map.filter (> 0) wFreq'
          in go (left+1) cleaned chars
        | otherwise = []
      slide _ wFreq _ [] = []
      slide left wFreq right (c:rest) =
        let wFreq' = Map.insertWith (+) c 1 wFreq
            wLen = right - left + 1
        in if wLen > pLen
           then let lc = s !! left
                    wf = Map.adjust (subtract 1) lc wFreq'
                    wf' = Map.filter (> 0) wf
                in (if wLen - 1 == pLen && wf' == pFreq then [left+1] else [])
                    ++ slide (left+1) wf' (right+1) rest
           else (if wLen == pLen && wFreq' == pFreq then [left] else [])
                    ++ slide left wFreq' (right+1) rest
  in slide 0 Map.empty 0 s
