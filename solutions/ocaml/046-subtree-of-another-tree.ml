(*
  Problem 46: Subtree of Another Tree (LeetCode 572)
  Difficulty: Easy
  Language: OCaml
*)
type tree = Leaf | Node of int * tree * tree

let rec same_tree a b = match (a, b) with
  | Leaf, Leaf -> true
  | Node (v1, l1, r1), Node (v2, l2, r2) ->
    v1 = v2 && same_tree l1 l2 && same_tree r1 r2
  | _ -> false

let rec is_subtree root sub = match root with
  | Leaf -> sub = Leaf
  | Node (_, l, r) ->
    same_tree root sub || is_subtree l sub || is_subtree r sub
