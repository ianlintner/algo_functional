(*
  Problem 50: Climbing Stairs (LeetCode 70)
  Difficulty: Easy
  Language: OCaml
*)
let climb_stairs n =
  let rec go i a b = if i >= n then a else go (i+1) b (a+b)
  in go 0 1 1
