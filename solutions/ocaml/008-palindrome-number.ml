(*
  Problem 8: Palindrome Number (LeetCode 9)
  Difficulty: Easy
  Language: OCaml
*)
let is_palindrome x =
  if x < 0 then false
  else
    let s = string_of_int x in
    let n = String.length s in
    let rec check i =
      if i >= n / 2 then true
      else s.[i] = s.[n - 1 - i] && check (i + 1)
    in
    check 0
