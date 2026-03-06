{-
  Problem 29: Valid Sudoku (LeetCode 36)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Set as Set

isValidSudoku :: [[Char]] -> Bool
isValidSudoku board =
  let entries = [ (i, j, c)
                | (i, row) <- zip [0..] board
                , (j, c)   <- zip [0..] row
                , c /= '.' ]
      keys (i, j, c) =
        [ "r" ++ show i ++ ":" ++ [c]
        , "c" ++ show j ++ ":" ++ [c]
        , "b" ++ show (i `div` 3) ++ "," ++ show (j `div` 3) ++ ":" ++ [c]
        ]
      allKeys = concatMap keys entries
  in length allKeys == Set.size (Set.fromList allKeys)
