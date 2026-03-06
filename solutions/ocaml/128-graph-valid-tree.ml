(*
  Problem 128: Graph Valid Tree (LeetCode 261)
  Difficulty: Med
  Language: OCaml
*)
module IntSet = Set.Make(Int)
module IntMap = Map.Make(Int)

let valid_tree n edges =
  if List.length edges <> n - 1 then false
  else
    let adj = List.fold_left (fun g (u, v) ->
      let g = IntMap.update u (function
        | None -> Some [v] | Some l -> Some (v::l)) g in
      IntMap.update v (function
        | None -> Some [u] | Some l -> Some (u::l)) g
    ) IntMap.empty edges in
    let rec dfs node visited =
      if IntSet.mem node visited then visited
      else let nbs = try IntMap.find node adj with Not_found -> [] in
        List.fold_left (fun v nb -> dfs nb v)
          (IntSet.add node visited) nbs in
    IntSet.cardinal (dfs 0 IntSet.empty) = n
