(*
  Problem 97: Number of 1 Bits (LeetCode 191)
  Difficulty: Easy
  Language: OCaml
*)
let rec hamming_weight = function
  | 0 -> 0
  | n -> (n land 1) + hamming_weight (n lsr 1)
