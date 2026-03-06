(*
  Problem 129: Missing Number (LeetCode 268)
  Difficulty: Easy
  Language: OCaml
*)
let missing_number nums =
  let n = List.length nums in
  let xor_nums = List.fold_left (lxor) 0 nums in
  let xor_all = List.init (n + 1) Fun.id |> List.fold_left (lxor) 0 in
  xor_nums lxor xor_all
