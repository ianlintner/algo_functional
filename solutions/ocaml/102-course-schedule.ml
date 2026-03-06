(*
  Problem 102: Course Schedule (LeetCode 207)
  Difficulty: Med
  Language: OCaml
*)
module IS = Set.Make(Int)

let can_finish n prereqs =
  let graph = List.fold_left (fun g (a, b) ->
    let cur = try List.assoc b g with Not_found -> [] in
    (b, a :: cur) :: List.filter (fun (k,_) -> k <> b) g
  ) [] prereqs in
  let nbrs v = try List.assoc v graph with Not_found -> [] in
  let rec dfs v (path, done) =
    if IS.mem v done then (false, (path, done))
    else if IS.mem v path then (true, (path, done))
    else
      let (cyc, (p, d)) = List.fold_left
        (fun (c, s) nb -> if c then (true, s) else dfs nb s)
        (false, (IS.add v path, done)) (nbrs v) in
      (cyc, (p, IS.add v d)) in
  let (has_cyc, _) = List.init n Fun.id |> List.fold_left
    (fun (c, s) i -> if c then (true, s) else dfs i s)
    (false, (IS.empty, IS.empty)) in
  not has_cyc
