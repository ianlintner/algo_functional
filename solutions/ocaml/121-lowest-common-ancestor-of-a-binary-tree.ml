(*
  Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
  Difficulty: Med
  Language: OCaml
*)
type 'a btree = BLeaf | BNode of 'a btree * 'a * 'a btree

let rec lca root p q = match root with
  | BLeaf -> None
  | BNode (_, v, _) when v = p || v = q -> Some v
  | BNode (l, v, r) ->
    match lca l p q, lca r p q with
    | Some _, Some _ -> Some v
    | Some x, None | None, Some x -> Some x
    | _ -> None
