(*
  Problem 93: Largest Number (LeetCode 179)
  Difficulty: Med
  Language: OCaml
*)
let largest_number nums =
  let strs = List.map string_of_int nums in
  let sorted = List.sort (fun a b -> compare (b ^ a) (a ^ b)) strs in
  let res = String.concat "" sorted in
  if res.[0] = '0' then "0" else res
