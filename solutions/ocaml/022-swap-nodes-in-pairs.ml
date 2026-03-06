(*
  Problem 22: Swap Nodes in Pairs (LeetCode 24)
  Difficulty: Med
  Language: OCaml
*)
let rec swap_pairs = function
  | [] -> []
  | [x] -> [x]
  | x :: y :: rest -> y :: x :: swap_pairs rest
