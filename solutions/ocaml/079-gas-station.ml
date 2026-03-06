(*
  Problem 79: Gas Station (LeetCode 134)
  Difficulty: Med
  Language: OCaml
*)
let can_complete_circuit gas cost =
  let diffs = List.map2 (-) gas cost in
  let (total, _, start) = List.fold_left (fun (tot, tank, s) (d, i) ->
    let tot' = tot + d and tank' = tank + d in
    if tank' < 0 then (tot', 0, i + 1) else (tot', tank', s))
    (0, 0, 0) (List.mapi (fun i d -> (d, i)) diffs) in
  if total >= 0 then start else -1
