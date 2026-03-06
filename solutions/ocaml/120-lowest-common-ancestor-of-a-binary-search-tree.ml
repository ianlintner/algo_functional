(*
  Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
  Difficulty: Med
  Language: OCaml
*)
let rec lca_bst root p q = match root with
  | Leaf -> None
  | Node (l, v, _) when p < v && q < v -> lca_bst l p q
  | Node (_, v, r) when p > v && q > v -> lca_bst r p q
  | Node (_, v, _) -> Some v
