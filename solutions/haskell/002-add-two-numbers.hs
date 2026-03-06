{-
  Problem 2: Add Two Numbers (LeetCode 2)
  Difficulty: Med
  Language: Haskell
-}
data ListNode = ListNode Int (Maybe ListNode)

addTwoNumbers :: Maybe ListNode -> Maybe ListNode -> Maybe ListNode
addTwoNumbers l1 l2 = go l1 l2 0
  where
    go Nothing Nothing 0 = Nothing
    go n1 n2 carry =
      let v1 = maybe 0 (\(ListNode v _) -> v) n1
          v2 = maybe 0 (\(ListNode v _) -> v) n2
          s  = v1 + v2 + carry
          n1' = n1 >>= \(ListNode _ next) -> next
          n2' = n2 >>= \(ListNode _ next) -> next
      in Just (ListNode (s `mod` 10) (go n1' n2' (s `div` 10)))
