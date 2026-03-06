{-
  Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
  Difficulty: Med
  Language: Haskell
-}
data Tree = Nil | Node Int Tree Tree

distanceK :: Tree -> Int -> Int -> [Int]
distanceK root targetVal k =
  let parentMap = buildParents root Nothing []
      buildParents Nil _ acc = acc
      buildParents (Node v l r) par acc =
        buildParents l (Just v) (buildParents r (Just v) ((v, par):acc))
      pmap = foldr (\(v,p) m -> (v,p):m) [] parentMap
      lookupP v = lookup v pmap >>= id
      children (Node v l r) = filter (/= Nil) [l, r]
      children Nil = []
      bfs [] _ _ = []
      bfs nodes 0 _ = map (\(Node v _ _) -> v) nodes
      bfs nodes d visited =
        let nexts = concatMap (\(Node v l r) ->
              filter (\(Node v2 _ _) -> v2 `notElem` visited)
                (filter (/= Nil) [l, r])) nodes
        in bfs nexts (d-1) (map (\(Node v _ _) -> v) nodes ++ visited)
  in bfs [findNode root targetVal] k []
  where findNode Nil _ = Nil
        findNode n@(Node v l r) t
          | v == t = n
          | otherwise = case findNode l t of Nil -> findNode r t; x -> x
