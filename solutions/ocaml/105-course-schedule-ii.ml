(*
  Problem 105: Course Schedule II (LeetCode 210)
  Difficulty: Med
  Language: OCaml
*)
let find_order n prereqs =
  let module IS = Set.Make(Int) in
  let graph = List.fold_left (fun g (a, b) ->
    let cur = try List.assoc b g with Not_found -> [] in
    (b, a :: cur) :: List.filter (fun (k,_) -> k <> b) g
  ) [] prereqs in
  let nbrs v = try List.assoc v graph with Not_found -> [] in
  let rec dfs v (path, done, order, cyc) =
    if cyc || IS.mem v done then (path, done, order, cyc)
    else if IS.mem v path then (path, done, order, true)
    else
      let (p, d, o, c) = List.fold_left
        (fun s nb -> dfs nb s)
        (IS.add v path, done, order, false) (nbrs v) in
      (p, IS.add v d, o @ [v], c) in
  let (_, _, order, cyc) = List.init n Fun.id |> List.fold_left
    (fun s i -> dfs i s) (IS.empty, IS.empty, [], false) in
  if cyc then [] else order
