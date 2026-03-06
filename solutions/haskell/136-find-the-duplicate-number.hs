{-
  Problem 136: Find the Duplicate Number (LeetCode 287)
  Difficulty: Med
  Language: Haskell
-}
import Data.Array

findDuplicate :: [Int] -> Int
findDuplicate nums =
  let arr = listArray (0, length nums - 1) nums
      step i = arr ! i
      findMeet s f
        | s' == f' = s'
        | otherwise = findMeet s' f'
        where s' = step s; f' = step (step f)
      findStart a b
        | a == b    = a
        | otherwise = findStart (step a) (step b)
      meet = findMeet (step 0) (step (step 0))
  in findStart 0 meet
