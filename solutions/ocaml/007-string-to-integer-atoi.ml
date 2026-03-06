(*
  Problem 7: String to Integer (atoi) (LeetCode 8)
  Difficulty: Med
  Language: OCaml
*)
let my_atoi s =
  let trimmed = String.trim s in
  let n = String.length trimmed in
  if n = 0 then 0
  else
    let sign, start =
      match trimmed.[0] with
      | '-' -> (-1, 1)
      | '+' -> (1, 1)
      | _   -> (1, 0)
    in
    let rec collect i acc =
      if i >= n then acc
      else match trimmed.[i] with
        | '0'..'9' ->
          let d = Char.code trimmed.[i] - Char.code '0' in
          collect (i + 1) (acc * 10 + d)
        | _ -> acc
    in
    let value = collect start 0 in
    let result = sign * value in
    let max_int = 2147483647 in
    let min_int = -2147483648 in
    max min_int (min max_int result)
