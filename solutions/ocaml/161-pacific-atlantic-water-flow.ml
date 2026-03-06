(*
  Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
  Difficulty: Med
  Language: OCaml
*)
module PairSet = Set.Make(struct
  type t = int * int
  let compare = compare
end)

let pacific_atlantic heights =
  let rows = Array.length heights and cols = Array.length heights.(0) in
  let rec dfs visited r c =
    if PairSet.mem (r, c) visited then visited
    else
      let visited = PairSet.add (r, c) visited in
      List.fold_left (fun v (dr, dc) ->
        let nr, nc = r + dr, c + dc in
        if nr >= 0 && nr < rows && nc >= 0 && nc < cols
           && not (PairSet.mem (nr, nc) v)
           && heights.(nr).(nc) >= heights.(r).(c)
        then dfs v nr nc else v
      ) visited [(1,0);(-1,0);(0,1);(0,-1)]
  in
  let pac_starts = List.init rows (fun r -> (r, 0)) @ List.init cols (fun c -> (0, c)) in
  let atl_starts = List.init rows (fun r -> (r, cols-1)) @ List.init cols (fun c -> (rows-1, c)) in
  let pac = List.fold_left (fun v (r, c) -> dfs v r c) PairSet.empty pac_starts in
  let atl = List.fold_left (fun v (r, c) -> dfs v r c) PairSet.empty atl_starts in
  PairSet.elements (PairSet.inter pac atl)
