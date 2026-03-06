(*
  Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
  Difficulty: Easy
  Language: OCaml
*)
let rec max_depth = function
  | Nil -> 0
  | Node (_, l, r) -> 1 + max (max_depth l) (max_depth r)
