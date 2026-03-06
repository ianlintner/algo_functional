(*
  Problem 80: Single Number (LeetCode 136)
  Difficulty: Easy
  Language: OCaml
*)
let single_number nums =
  List.fold_left (lxor) 0 nums
