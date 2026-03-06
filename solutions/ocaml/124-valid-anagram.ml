(*
  Problem 124: Valid Anagram (LeetCode 242)
  Difficulty: Easy
  Language: OCaml
*)
let is_anagram s t =
  let sorted str =
    String.to_seq str |> List.of_seq |> List.sort Char.compare in
  sorted s = sorted t
