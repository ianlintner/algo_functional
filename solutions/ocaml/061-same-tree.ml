(*
  Problem 61: Same Tree (LeetCode 100)
  Difficulty: Easy
  Language: OCaml
*)
let rec is_same_tree p q = match (p, q) with
  | (Nil, Nil) -> true
  | (Node (v1, l1, r1), Node (v2, l2, r2)) ->
    v1 = v2 && is_same_tree l1 l2 && is_same_tree r1 r2
  | _ -> false
