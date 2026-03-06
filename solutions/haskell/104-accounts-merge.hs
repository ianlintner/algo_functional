{-
  Problem 104: Accounts Merge (LeetCode 721)
  Difficulty: Med
  Language: Haskell
-}
import qualified Data.Map as M
import Data.List (sort)

type UF = M.Map String String

find' :: UF -> String -> (UF, String)
find' uf x = case M.lookup x uf of
  Nothing -> (M.insert x x uf, x)
  Just p | p == x -> (uf, x)
         | otherwise -> let (uf', r) = find' uf p in (M.insert x r uf', r)

union' :: UF -> String -> String -> UF
union' uf a b = let (u1, ra) = find' uf a; (u2, rb) = find' u1 b
                in if ra == rb then u2 else M.insert ra rb u2

accountsMerge :: [[String]] -> [[String]]
accountsMerge accs =
  let (uf, owner) = foldl (\(u, o) (name:emails) ->
        foldl (\(u', o') e -> (union' u' (head emails) e, M.insert e name o'))
              (u, o) emails) (M.empty, M.empty) accs
      groups = foldl (\g e -> let (_, r) = find' uf e in
        M.insertWith (++) r [e] g) M.empty (M.keys owner)
  in map (\es -> (owner M.! head es) : sort es) (M.elems groups)
