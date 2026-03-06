(*
  Problem 33: First Missing Positive (LeetCode 41)
  Difficulty: Hard
  Language: OCaml
*)
let first_missing_positive nums =
  let module S = Set.Make(Int) in
  let s = List.fold_left (fun acc n ->
    if n > 0 then S.add n acc else acc) S.empty nums in
  let rec go i = if S.mem i s then go (i + 1) else i in
  go 1
