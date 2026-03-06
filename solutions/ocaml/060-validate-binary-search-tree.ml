(*
  Problem 60: Validate Binary Search Tree (LeetCode 98)
  Difficulty: Med
  Language: OCaml
*)
type tree = Nil | Node of int * tree * tree

let is_valid_bst root =
  let rec go lo hi = function
    | Nil -> true
    | Node (v, l, r) ->
      v > lo && v < hi &&
      go lo v l && go v hi r
  in go min_int max_int root
