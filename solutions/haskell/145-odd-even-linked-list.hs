{-
  Problem 145: Odd Even Linked List (LeetCode 328)
  Difficulty: Med
  Language: Haskell
-}
data ListNode = ListNode Int (Maybe ListNode)

oddEvenList :: Maybe ListNode -> Maybe ListNode
oddEvenList Nothing = Nothing
oddEvenList head =
  let collect Nothing _ odds evens = (reverse odds, reverse evens)
      collect (Just (ListNode v next)) True odds evens =
        collect next False (v:odds) evens
      collect (Just (ListNode v next)) False odds evens =
        collect next True odds (v:evens)
      (odds, evens) = collect head True [] []
      build [] = Nothing
      build (v:vs) = Just (ListNode v (build vs))
  in build (odds ++ evens)
