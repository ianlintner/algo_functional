(*
  Problem 62: Symmetric Tree (LeetCode 101)
  Difficulty: Easy
  Language: OCaml
*)
let is_symmetric root =
  let rec mirror a b = match (a, b) with
    | (Nil, Nil) -> true
    | (Node (v1,l1,r1), Node (v2,l2,r2)) ->
      v1 = v2 && mirror l1 r2 && mirror r1 l2
    | _ -> false
  in match root with Nil -> true | Node (_,l,r) -> mirror l r
