(*
  Problem 117: Kth Smallest Element in a BST (LeetCode 230)
  Difficulty: Med
  Language: OCaml
*)
type tree = Leaf | Node of tree * int * tree

let kth_smallest root k =
  let rec inorder = function
    | Leaf -> []
    | Node (l, v, r) -> inorder l @ [v] @ inorder r
  in List.nth (inorder root) (k - 1)
