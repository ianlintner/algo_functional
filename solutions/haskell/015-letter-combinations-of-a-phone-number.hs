{-
  Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map as Map

letterCombinations :: String -> [String]
letterCombinations "" = []
letterCombinations digits = foldl expand [""] digits
  where
    phone = Map.fromList [('2',"abc"),('3',"def"),('4',"ghi"),
                          ('5',"jkl"),('6',"mno"),('7',"pqrs"),
                          ('8',"tuv"),('9',"wxyz")]
    expand combos d =
      let letters = Map.findWithDefault "" d phone
      in [c ++ [l] | c <- combos, l <- letters]
