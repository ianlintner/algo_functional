(*
  Problem 32: Combination Sum (LeetCode 39)
  Difficulty: Med
  Language: OCaml
*)
let combination_sum candidates target =
  let sorted = List.sort compare candidates in
  let rec go cands remain curr =
    match cands with
    | [] -> if remain = 0 then [List.rev curr] else []
    | c :: _ when c > remain ->
      if remain = 0 then [List.rev curr] else []
    | c :: rest ->
      if remain = 0 then [List.rev curr]
      else go cands (remain - c) (c :: curr) @ go rest remain curr
  in
  go sorted target []
