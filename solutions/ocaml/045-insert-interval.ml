(*
  Problem 45: Insert Interval (LeetCode 57)
  Difficulty: Med
  Language: OCaml
*)
let insert_interval intervals (ns, ne) =
  let all = List.sort (fun a b -> compare (fst a) (fst b)) ((ns, ne) :: intervals) in
  List.fold_left (fun acc (s, e) ->
    match acc with
    | (ps, pe) :: rest when s <= pe -> (ps, max pe e) :: rest
    | _ -> (s, e) :: acc
  ) [] all |> List.rev
