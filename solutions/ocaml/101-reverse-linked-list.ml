(*
  Problem 101: Reverse Linked List (LeetCode 206)
  Difficulty: Easy
  Language: OCaml
*)
let reverse_list lst =
  List.fold_left (fun acc x -> x :: acc) [] lst
