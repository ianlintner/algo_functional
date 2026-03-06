(*
  Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
  Difficulty: Easy
  Language: OCaml
*)
let rec sorted_array_to_bst nums = match nums with
  | [] -> Nil
  | _ ->
    let mid = List.length nums / 2 in
    let left = List.filteri (fun i _ -> i < mid) nums in
    let v = List.nth nums mid in
    let right = List.filteri (fun i _ -> i > mid) nums in
    Node (v, sorted_array_to_bst left, sorted_array_to_bst right)
