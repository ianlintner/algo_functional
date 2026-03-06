(*
  Problem 36: Rotate Image (LeetCode 48)
  Difficulty: Med
  Language: OCaml
*)
let rotate matrix =
  let n = Array.length matrix in
  Array.init n (fun i ->
    Array.init n (fun j -> matrix.(n - 1 - j).(i)))
