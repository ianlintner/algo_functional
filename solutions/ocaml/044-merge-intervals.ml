(*
  Problem 44: Merge Intervals (LeetCode 56)
  Difficulty: Med
  Language: OCaml
*)
let merge_intervals intervals =
  let sorted = List.sort (fun a b -> compare (fst a) (fst b)) intervals in
  List.fold_left (fun acc (s, e) ->
    match acc with
    | (ps, pe) :: rest when s <= pe -> (ps, max pe e) :: rest
    | _ -> (s, e) :: acc
  ) [] sorted |> List.rev
