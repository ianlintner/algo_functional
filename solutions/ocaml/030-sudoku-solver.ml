(*
  Problem 30: Sudoku Solver (LeetCode 37)
  Difficulty: Hard
  Language: OCaml
*)
let solve_sudoku board =
  let b = Array.map Array.copy board in
  let is_valid r c d =
    let br = (r / 3) * 3 and bc = (c / 3) * 3 in
    let row_ok = Array.for_all (fun x -> x <> d) b.(r) in
    let col_ok = Array.for_all (fun row -> row.(c) <> d) b in
    let box_ok = ref true in
    for i = 0 to 2 do for j = 0 to 2 do
      if b.(br+i).(bc+j) = d then box_ok := false
    done done;
    row_ok && col_ok && !box_ok
  in
  let rec solve () =
    match Array.to_seq b |> Seq.find_mapi (fun i row ->
      Array.to_seq row |> Seq.find_mapi (fun j c ->
        if c = '.' then Some (i, j) else None))
    with
    | None -> true
    | Some (r, c) ->
      let digits = List.init 9 (fun i -> Char.chr (i + Char.code '1')) in
      List.exists (fun d ->
        if is_valid r c d then begin
          b.(r).(c) <- d;
          if solve () then true else (b.(r).(c) <- '.'; false)
        end else false
      ) digits
  in
  ignore (solve ()); b
