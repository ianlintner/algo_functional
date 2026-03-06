(*
  Problem 114: Invert Binary Tree (LeetCode 226)
  Difficulty: Easy
  Language: OCaml
*)
type 'a tree = Nil | Node of 'a * 'a tree * 'a tree

let rec invert_tree = function
  | Nil -> Nil
  | Node (v, l, r) -> Node (v, invert_tree r, invert_tree l)
