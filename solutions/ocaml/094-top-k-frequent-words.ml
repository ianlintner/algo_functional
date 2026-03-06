(*
  Problem 94: Top K Frequent Words (LeetCode 692)
  Difficulty: Med
  Language: OCaml
*)
let top_k_frequent words k =
  let freq = List.fold_left (fun m w ->
    let c = try List.assoc w m with Not_found -> 0 in
    (w, c + 1) :: List.filter (fun (k, _) -> k <> w) m
  ) [] words in
  freq
  |> List.sort (fun (w1, c1) (w2, c2) ->
    let cc = compare c2 c1 in
    if cc <> 0 then cc else compare w1 w2)
  |> List.filteri (fun i _ -> i < k)
  |> List.map fst
