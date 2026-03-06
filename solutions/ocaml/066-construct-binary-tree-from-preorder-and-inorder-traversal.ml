(*
  Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
  Difficulty: Med
  Language: OCaml
*)
let rec build_tree preorder inorder = match preorder with
  | [] -> Nil
  | r :: pre ->
    let rec split = function
      | [] -> ([], [])
      | x :: xs when x = r -> ([], xs)
      | x :: xs -> let (l, rr) = split xs in (x :: l, rr)
    in
    let (left_in, right_in) = split inorder in
    let n = List.length left_in in
    let left_pre = List.filteri (fun i _ -> i < n) pre in
    let right_pre = List.filteri (fun i _ -> i >= n) pre in
    Node (r, build_tree left_pre left_in, build_tree right_pre right_in)
