(*
  Problem 51: Set Matrix Zeroes (LeetCode 73)
  Difficulty: Med
  Language: OCaml
*)
let set_zeroes matrix =
  let has_zero row = List.exists ((=) 0) row in
  let zero_rows = List.mapi (fun i row -> if has_zero row then Some i else None) matrix
    |> List.filter_map Fun.id in
  let n = List.length (List.hd matrix) in
  let zero_cols = List.init n (fun j ->
    if List.exists (fun row -> List.nth row j = 0) matrix then Some j else None)
    |> List.filter_map Fun.id in
  List.mapi (fun i row ->
    List.mapi (fun j v ->
      if List.mem i zero_rows || List.mem j zero_cols then 0 else v
    ) row
  ) matrix
