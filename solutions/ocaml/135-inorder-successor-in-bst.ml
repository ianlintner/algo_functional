(*
  Problem 135: Inorder Successor in BST (LeetCode 285)
  Difficulty: Med
  Language: OCaml
*)
type tree = Leaf | Node of int * tree * tree

let rec inorder_successor root p =
  match root with
  | Leaf -> None
  | Node (v, left, _) when v > p ->
    (match inorder_successor left p with
     | None -> Some v
     | res  -> res)
  | Node (_, _, right) -> inorder_successor right p
