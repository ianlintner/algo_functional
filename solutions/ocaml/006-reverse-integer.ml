(*
  Problem 6: Reverse Integer (LeetCode 7)
  Difficulty: Med
  Language: OCaml
*)
let reverse_integer x =
  let sign = if x < 0 then -1 else 1 in
  let s = string_of_int (abs x) in
  let n = String.length s in
  let reversed_s = String.init n (fun i -> s.[n - 1 - i]) in
  let reversed = sign * int_of_string reversed_s in
  let max_int32 = 2147483647 in
  let min_int32 = -2147483648 in
  if reversed > max_int32 || reversed < min_int32 then 0 else reversed
