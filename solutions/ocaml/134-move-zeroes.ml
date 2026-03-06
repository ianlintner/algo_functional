(*
  Problem 134: Move Zeroes (LeetCode 283)
  Difficulty: Easy
  Language: OCaml
*)
let move_zeroes nums =
  let non_zeros = List.filter (fun x -> x <> 0) nums in
  let zeros = List.filter (fun x -> x = 0) nums in
  non_zeros @ zeros
