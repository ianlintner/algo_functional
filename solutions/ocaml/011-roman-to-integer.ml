(*
  Problem 11: Roman to Integer (LeetCode 13)
  Difficulty: Easy
  Language: OCaml
*)
let roman_to_int s =
  let value = function
    | 'I' -> 1 | 'V' -> 5 | 'X' -> 10 | 'L' -> 50
    | 'C' -> 100 | 'D' -> 500 | 'M' -> 1000 | _ -> 0
  in
  let n = String.length s in
  let rec go i prev total =
    if i < 0 then total
    else
      let v = value s.[i] in
      if v < prev then go (i - 1) v (total - v)
      else go (i - 1) v (total + v)
  in
  go (n - 1) 0 0
