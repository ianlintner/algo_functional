(*
  Problem 38: Pow(x, n) (LeetCode 50)
  Difficulty: Med
  Language: OCaml
*)
let rec my_pow x n =
  if n = 0 then 1.0
  else if n < 0 then my_pow (1.0 /. x) (-n)
  else if n mod 2 = 0 then my_pow (x *. x) (n / 2)
  else x *. my_pow (x *. x) (n / 2)
