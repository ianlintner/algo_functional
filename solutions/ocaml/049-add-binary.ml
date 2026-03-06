(*
  Problem 49: Add Binary (LeetCode 67)
  Difficulty: Easy
  Language: OCaml
*)
let add_binary a b =
  let rec go i j carry =
    if i < 0 && j < 0 && carry = 0 then ""
    else
      let da = if i >= 0 then Char.code a.[i] - 48 else 0 in
      let db = if j >= 0 then Char.code b.[j] - 48 else 0 in
      let s = da + db + carry in
      go (i-1) (j-1) (s / 2) ^ string_of_int (s mod 2)
  in go (String.length a - 1) (String.length b - 1) 0
