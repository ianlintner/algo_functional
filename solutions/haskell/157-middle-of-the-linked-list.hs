{-
  Problem 157: Middle of the Linked List (LeetCode 876)
  Difficulty: Easy
  Language: Haskell
-}
data ListNode = ListNode { val :: Int, next :: Maybe ListNode }

middleNode :: Maybe ListNode -> Maybe ListNode
middleNode head =
  let nodes = collect head
      collect Nothing = []
      collect (Just n) = n : collect (next n)
      len = length nodes
  in if null nodes then Nothing
     else Just (nodes !! (len `div` 2))
