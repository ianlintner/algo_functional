(*
  Problem 96: Reverse Bits (LeetCode 190)
  Difficulty: Easy
  Language: OCaml
*)
let reverse_bits n =
  List.init 32 Fun.id
  |> List.fold_left (fun acc i ->
    acc lor (((n lsr i) land 1) lsl (31 - i))
  ) 0
