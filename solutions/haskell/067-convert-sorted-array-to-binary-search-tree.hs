{-
  Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
  Difficulty: Easy
  Language: Haskell
-}
sortedArrayToBST :: [a] -> Tree a
sortedArrayToBST [] = Nil
sortedArrayToBST xs =
  let mid = length xs \`div\` 2
      (left, r:right) = splitAt mid xs
  in Node r (sortedArrayToBST left) (sortedArrayToBST right)
